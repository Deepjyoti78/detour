import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyOperatorAuth } from '@/lib/auth-guard';
import { VehicleCategory } from '@/generated/prisma/client';
import { z } from 'zod';

const createProductSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().positive('Daily rate must be positive'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  photo_url: z.string().optional().default('/assets/sunset.jpg'),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const page = Math.max(1, Number(searchParams.get('page') ?? 1));
    const limit = Math.max(1, Math.min(100, Number(searchParams.get('limit') ?? 10)));
    const offset = (page - 1) * limit;

    const categoriesParam = searchParams.get('categories');
    const search = searchParams.get('search')?.trim();
    const sort = searchParams.get('sort');

    // Build filter
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (categoriesParam) {
      const cats = categoriesParam
        .split('.')
        .map((c) => c.toUpperCase())
        .filter((c) => ['CLASSIC', 'CITY', 'TOURING', 'ELECTRIC'].includes(c)) as VehicleCategory[];
      if (cats.length > 0) {
        where.category = { in: cats };
      }
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { headline: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Sort order
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let orderBy: any = { createdAt: 'desc' };
    if (sort) {
      const [field, direction] = sort.split('.');
      const dir = direction === 'desc' ? 'desc' : 'asc';
      if (field === 'price') orderBy = { baseDailyRate: dir };
      else if (field === 'name') orderBy = { name: dir };
    }

    const [total, models] = await Promise.all([
      prisma.vehicleModel.count({ where }),
      prisma.vehicleModel.findMany({
        where,
        skip: offset,
        take: limit,
        orderBy,
        include: {
          vehicles: {
            select: {
              id: true,
              licensePlate: true,
              status: true,
              currentMileage: true,
              fuelOrBatteryLevel: true,
              depot: { select: { id: true, name: true, city: true } },
            },
          },
        },
      }),
    ]);

    const products = models.map((m, idx) => ({
      id: m.slug, // string identifier matching route
      numericId: idx + 1 + offset,
      name: m.name,
      category: m.category.charAt(0).toUpperCase() + m.category.slice(1).toLowerCase(),
      price: Number(m.baseDailyRate),
      description: m.headline || m.shortDescription || m.description,
      photo_url: m.heroImage || '/assets/sunset.jpg',
      created_at: m.createdAt.toISOString(),
      updated_at: m.updatedAt.toISOString(),
      vehicles_count: m.vehicles.length,
      available_count: m.vehicles.filter((v) => v.status === 'AVAILABLE').length,
    }));

    return NextResponse.json({
      success: true,
      time: new Date().toISOString(),
      message: 'Fleet inventory retrieved successfully from PostgreSQL',
      total_products: total,
      offset,
      limit,
      products,
    });
  } catch (error) {
    console.error('Failed to get products from PostgreSQL:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inventory from database' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Authorization check
  const authCheck = await verifyOperatorAuth(request);
  if (!authCheck.authorized) {
    return NextResponse.json({ success: false, error: authCheck.error }, { status: authCheck.status });
  }

  try {
    const rawBody = await request.json();
    const validation = createProductSchema.safeParse(rawBody);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          issues: validation.error.format(),
        },
        { status: 400 }
      );
    }

    const { name, category, price, description, photo_url } = validation.data;

    // Normalize category
    const catUpper = category.toUpperCase();
    const validCat = (
      ['CLASSIC', 'CITY', 'TOURING', 'ELECTRIC'].includes(catUpper)
        ? catUpper
        : VehicleCategory.CLASSIC
    ) as VehicleCategory;

    // Generate unique slug
    const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const slug = `${baseSlug}-${Date.now().toString(36)}`;

    // Create in PostgreSQL
    const newModel = await prisma.vehicleModel.create({
      data: {
        slug,
        name,
        category: validCat,
        headline: description.slice(0, 100),
        shortDescription: description.slice(0, 100),
        description,
        baseDailyRate: price,
        depositAmount: 500,
        heroImage: photo_url,
        isAvailable: true,
      },
    });

    // Also assign an initial physical vehicle asset in the primary Mumbai depot
    const primaryDepot = await prisma.depot.findFirst();
    if (primaryDepot) {
      const randomPlateSuffix = Math.floor(1000 + Math.random() * 9000);
      await prisma.vehicle.create({
        data: {
          modelId: newModel.id,
          depotId: primaryDepot.id,
          vin: `1DETOUR${Date.now().toString(36).toUpperCase()}${randomPlateSuffix}`,
          licensePlate: `MH 01 DT ${randomPlateSuffix}`,
          color: 'Signal Black',
          year: 2024,
          currentMileage: 50,
          fuelOrBatteryLevel: 100,
          status: 'AVAILABLE',
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Vehicle model and inventory asset created in PostgreSQL',
        product: {
          id: newModel.slug,
          name: newModel.name,
          category: newModel.category.charAt(0).toUpperCase() + newModel.category.slice(1).toLowerCase(),
          price: Number(newModel.baseDailyRate),
          description: newModel.description,
          photo_url: newModel.heroImage,
          created_at: newModel.createdAt.toISOString(),
          updated_at: newModel.updatedAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create vehicle in PostgreSQL:', error);
    return NextResponse.json(
      { success: false, error: 'Database error creating vehicle inventory' },
      { status: 500 }
    );
  }
}

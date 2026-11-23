import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { VehicleCategory } from '@/generated/prisma/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const categoryParam = searchParams.get('category')?.toUpperCase();
    const depotParam = searchParams.get('depot');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = { isAvailable: true };

    if (categoryParam && categoryParam !== 'ALL') {
      if (['CLASSIC', 'CITY', 'TOURING', 'ELECTRIC'].includes(categoryParam)) {
        where.category = categoryParam as VehicleCategory;
      }
    }

    if (depotParam) {
      where.vehicles = {
        some: {
          depot: {
            OR: [{ code: depotParam }, { id: depotParam }, { city: { equals: depotParam, mode: 'insensitive' } }],
          },
        },
      };
    }

    const models = await prisma.vehicleModel.findMany({
      where,
      orderBy: { baseDailyRate: 'asc' },
      include: {
        vehicles: {
          select: {
            id: true,
            status: true,
            depot: {
              select: { id: true, code: true, name: true, city: true },
            },
          },
        },
      },
    });

    // Format for consumer app
    const cars = models.map((m) => {
      const availableVehicles = m.vehicles.filter((v) => v.status === 'AVAILABLE');
      return {
        id: m.slug,
        slug: m.slug,
        name: m.name,
        category: m.category.toLowerCase(),
        rate: Number(m.baseDailyRate),
        seats: m.seats,
        luggage: typeof m.luggage === 'string' ? parseInt(m.luggage) || 2 : m.luggage,
        closedDay: 3, // fallback maintenance day
        transmission: m.transmission,
        image: m.heroImage,
        alt: m.headline || m.name,
        description: m.shortDescription || m.description,
        bestFor: m.headline || m.shortDescription,
        totalFleet: m.vehicles.length,
        availableCount: availableVehicles.length,
        depots: Array.from(new Set(m.vehicles.map((v) => v.depot.name))),
      };
    });

    return NextResponse.json({
      success: true,
      count: cars.length,
      data: cars,
    });
  } catch (error) {
    console.error('Failed to load fleet catalog from PostgreSQL, falling back to static CARS:', error);
    const { CARS } = await import('@/lib/data');
    return NextResponse.json({
      success: true,
      count: CARS.length,
      data: CARS.map((car) => ({
        ...car,
        slug: car.id,
        totalFleet: 5,
        availableCount: 4,
        depots: ['Mumbai Downtown', 'Goa Airport', 'Delhi Hub'],
      })),
    });
  }
}

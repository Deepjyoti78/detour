import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyOperatorAuth } from '@/lib/auth-guard';
import { VehicleCategory } from '@/generated/prisma/client';
import { z } from 'zod';

type Params = { params: Promise<{ id: string }> };

const updateProductSchema = z.object({
  name: z.string().min(2).optional(),
  category: z.string().optional(),
  price: z.number().positive().optional(),
  description: z.string().min(5).optional(),
  photo_url: z.string().optional(),
});

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    // Search by slug or cuid id
    const model = await prisma.vehicleModel.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        vehicles: {
          include: {
            depot: true,
          },
        },
      },
    });

    if (!model) {
      return NextResponse.json(
        { success: false, message: `Vehicle model '${id}' not found in database` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      time: new Date().toISOString(),
      message: 'Vehicle model retrieved from PostgreSQL',
      product: {
        id: model.slug,
        name: model.name,
        category: model.category.charAt(0).toUpperCase() + model.category.slice(1).toLowerCase(),
        price: Number(model.baseDailyRate),
        description: model.description,
        photo_url: model.heroImage,
        created_at: model.createdAt.toISOString(),
        updated_at: model.updatedAt.toISOString(),
        vehicles: model.vehicles,
      },
    });
  } catch (error) {
    console.error('Error fetching product from PostgreSQL:', error);
    return NextResponse.json({ success: false, error: 'Database fetch error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  const authCheck = await verifyOperatorAuth(request);
  if (!authCheck.authorized) {
    return NextResponse.json({ success: false, error: authCheck.error }, { status: authCheck.status });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const validation = updateProductSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', issues: validation.error.format() },
        { status: 400 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};
    if (validation.data.name) updateData.name = validation.data.name;
    if (validation.data.price) updateData.baseDailyRate = validation.data.price;
    if (validation.data.description) {
      updateData.description = validation.data.description;
      updateData.headline = validation.data.description.slice(0, 100);
    }
    if (validation.data.photo_url) updateData.heroImage = validation.data.photo_url;
    if (validation.data.category) {
      const cat = validation.data.category.toUpperCase();
      if (['CLASSIC', 'CITY', 'TOURING', 'ELECTRIC'].includes(cat)) {
        updateData.category = cat as VehicleCategory;
      }
    }

    // Find and update
    const existing = await prisma.vehicleModel.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });

    if (!existing) {
      return NextResponse.json({ success: false, message: 'Vehicle model not found' }, { status: 404 });
    }

    const updated = await prisma.vehicleModel.update({
      where: { id: existing.id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'Vehicle model updated successfully in PostgreSQL',
      product: {
        id: updated.slug,
        name: updated.name,
        category: updated.category.charAt(0).toUpperCase() + updated.category.slice(1).toLowerCase(),
        price: Number(updated.baseDailyRate),
        description: updated.description,
        photo_url: updated.heroImage,
        created_at: updated.createdAt.toISOString(),
        updated_at: updated.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error('Error updating vehicle in PostgreSQL:', error);
    return NextResponse.json({ success: false, error: 'Database update failed' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const authCheck = await verifyOperatorAuth(request);
  if (!authCheck.authorized) {
    return NextResponse.json({ success: false, error: authCheck.error }, { status: authCheck.status });
  }

  try {
    const { id } = await params;
    const existing = await prisma.vehicleModel.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      include: {
        vehicles: {
          include: { bookings: { where: { status: { in: ['CONFIRMED', 'ACTIVE'] } } } },
        },
      },
    });

    if (!existing) {
      return NextResponse.json({ success: false, message: 'Vehicle model not found' }, { status: 404 });
    }

    // Check if any vehicle is currently rented or booked
    const hasActiveBookings = existing.vehicles.some((v) => v.bookings.length > 0);
    if (hasActiveBookings) {
      // Mark as unavailable rather than deleting active booking foreign keys
      await prisma.vehicleModel.update({
        where: { id: existing.id },
        data: { isAvailable: false },
      });
      return NextResponse.json({
        success: true,
        message: 'Vehicle model marked as retired due to active booking history',
      });
    }

    // Delete associated physical vehicles and model
    await prisma.$transaction([
      prisma.vehicle.deleteMany({ where: { modelId: existing.id } }),
      prisma.vehicleModel.delete({ where: { id: existing.id } }),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Vehicle model and inventory assets removed from PostgreSQL',
    });
  } catch (error) {
    console.error('Error deleting vehicle from PostgreSQL:', error);
    return NextResponse.json({ success: false, error: 'Database deletion failed' }, { status: 500 });
  }
}

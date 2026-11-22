import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const model = await prisma.vehicleModel.findFirst({
      where: {
        OR: [{ slug: id }, { id }],
      },
      include: {
        vehicles: {
          include: {
            depot: {
              select: {
                id: true,
                code: true,
                name: true,
                city: true,
                address: true,
              },
            },
          },
        },
      },
    });

    if (!model) {
      return NextResponse.json(
        { success: false, error: `Vehicle model '${id}' not found` },
        { status: 404 }
      );
    }

    const availableVehicles = model.vehicles.filter((v) => v.status === 'AVAILABLE');

    const carDetail = {
      id: model.slug,
      slug: model.slug,
      name: model.name,
      category: model.category.toLowerCase(),
      rate: Number(model.baseDailyRate),
      deposit: Number(model.depositAmount),
      seats: model.seats,
      luggage: typeof model.luggage === 'string' ? parseInt(model.luggage) || 2 : model.luggage,
      transmission: model.transmission,
      engine: model.engine,
      range: model.range,
      fuelType: model.fuelType,
      topSpeed: model.topSpeed,
      acceleration: model.acceleration,
      image: model.heroImage,
      alt: model.headline || model.name,
      description: model.description,
      bestFor: model.headline || model.shortDescription,
      gallery: model.gallery.length > 0 ? model.gallery : [model.heroImage],
      features: model.features,
      totalFleet: model.vehicles.length,
      availableCount: availableVehicles.length,
      depots: model.vehicles.map((v) => ({
        depotId: v.depot.id,
        depotCode: v.depot.code,
        depotName: v.depot.name,
        city: v.depot.city,
        licensePlate: v.licensePlate,
        status: v.status,
      })),
    };

    return NextResponse.json({
      success: true,
      data: carDetail,
    });
  } catch (error) {
    console.error('Failed to load vehicle model detail from PostgreSQL:', error);
    return NextResponse.json(
      { success: false, error: 'Database fetch error' },
      { status: 500 }
    );
  }
}

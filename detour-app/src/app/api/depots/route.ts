import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const depots = await prisma.depot.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
      include: {
        vehicles: {
          select: {
            id: true,
            status: true,
            model: {
              select: { id: true, name: true, slug: true, category: true },
            },
          },
        },
      },
    });

    const formattedDepots = depots.map((d) => {
      const totalFleet = d.vehicles.length;
      const availableCount = d.vehicles.filter((v) => v.status === 'AVAILABLE').length;
      const rentedCount = d.vehicles.filter((v) => v.status === 'RENTED').length;
      const utilization = totalFleet > 0 ? Math.round((rentedCount / totalFleet) * 100) : 0;

      return {
        id: d.id,
        code: d.code,
        name: d.name,
        city: d.city,
        state: d.state,
        country: d.country,
        address: d.address,
        latitude: d.latitude,
        longitude: d.longitude,
        capacity: d.capacity,
        phone: d.contactPhone,
        operatingHours: d.operatingHours,
        totalFleet,
        availableVehicles: availableCount,
        activeRentals: rentedCount,
        utilizationRate: utilization,
        inventory: d.vehicles.map((v) => ({
          vehicleId: v.id,
          status: v.status,
          modelName: v.model.name,
          category: v.model.category,
        })),
      };
    });

    return NextResponse.json({
      success: true,
      count: formattedDepots.length,
      data: formattedDepots,
    });
  } catch (error) {
    console.error('Failed to load depots from PostgreSQL:', error);
    return NextResponse.json(
      { success: false, error: 'Database fetch error' },
      { status: 500 }
    );
  }
}

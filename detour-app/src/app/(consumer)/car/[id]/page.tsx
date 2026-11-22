import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { CARS } from '@/lib/data';
import CarDetailView from '@/components/fleet/CarDetailView';
import prisma from '@/lib/prisma';
import type { Car } from '@/types';

export function generateStaticParams() {
  return CARS.map((car) => ({
    id: car.id,
  }));
}

interface CarDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { id } = await params;

  let car: Car | undefined;

  try {
    const dbModel = await prisma.vehicleModel.findFirst({
      where: {
        OR: [{ slug: id }, { id }],
      },
    });

    if (dbModel) {
      car = {
        id: dbModel.slug,
        name: dbModel.name,
        category: dbModel.category.toLowerCase() as Car['category'],
        rate: Number(dbModel.baseDailyRate),
        seats: dbModel.seats,
        luggage: typeof dbModel.luggage === 'string' ? parseInt(dbModel.luggage) || 2 : dbModel.luggage,
        closedDay: 3,
        transmission: dbModel.transmission as Car['transmission'],
        image: dbModel.heroImage,
        alt: dbModel.headline || dbModel.name,
        description: dbModel.description,
        bestFor: dbModel.headline || dbModel.shortDescription,
      };
    }
  } catch (error) {
    console.warn('Fallback to local CARS array due to DB fetch error:', error);
  }

  // Fallback to static CARS catalog
  if (!car) {
    car = CARS.find((c) => c.id === id);
  }

  if (!car) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="p-12 text-center font-bold">Loading vehicle details...</div>}>
      <CarDetailView car={car} />
    </Suspense>
  );
}

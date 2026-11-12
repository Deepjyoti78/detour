import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { CARS } from '@/lib/data';
import CarDetailView from '@/components/fleet/CarDetailView';

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
  const car = CARS.find((c) => c.id === id);

  if (!car) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="p-12 text-center font-bold">Loading vehicle details...</div>}>
      <CarDetailView car={car} />
    </Suspense>
  );
}

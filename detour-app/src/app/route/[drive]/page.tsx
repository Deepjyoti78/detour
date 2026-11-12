import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { SCENIC_DRIVES } from '@/lib/data';
import RouteDetailView from '@/components/explore/RouteDetailView';

export function generateStaticParams() {
  return SCENIC_DRIVES.map((drive) => ({
    drive: drive.id,
  }));
}

interface RouteDetailPageProps {
  params: Promise<{ drive: string }>;
}

export default async function RouteDetailPage({ params }: RouteDetailPageProps) {
  const { drive: driveId } = await params;
  const drive = SCENIC_DRIVES.find((d) => d.id === driveId);

  if (!drive) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="p-12 text-center font-bold">Loading route details...</div>}>
      <RouteDetailView drive={drive} />
    </Suspense>
  );
}

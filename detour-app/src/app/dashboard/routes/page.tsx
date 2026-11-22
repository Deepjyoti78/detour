import PageContainer from '@/components/layout/page-container';
import { RoutesView } from '@/features/routes/components/routes-view';

export const metadata = {
  title: 'Scenic Drives & Itineraries | Detour Car Rental',
  description: 'Curated self-drive scenic routes, waypoints, recommended fleet categories, and drive itineraries.'
};

export default function RoutesPage() {
  return (
    <PageContainer>
      <RoutesView />
    </PageContainer>
  );
}

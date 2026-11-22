import PageContainer from '@/components/layout/page-container';
import { LocationsView } from '@/features/locations/components/locations-view';

export const metadata = {
  title: 'Depots & Hubs | Detour Car Rental',
  description: 'Manage regional pickup depots, fleet inventory, manager contacts, and branch hours.'
};

export default function LocationsPage() {
  return (
    <PageContainer>
      <LocationsView />
    </PageContainer>
  );
}

import PageContainer from '@/components/layout/page-container';
import { BookingsView } from '@/features/bookings/components/bookings-view';

export const metadata = {
  title: 'Reservations & Bookings | Detour Car Rental',
  description: 'Manage active customer reservations, pickups, returns, and vehicle handovers.'
};

export default function BookingsPage() {
  return (
    <PageContainer>
      <BookingsView />
    </PageContainer>
  );
}

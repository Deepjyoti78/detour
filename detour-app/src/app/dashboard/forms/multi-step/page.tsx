import { protectRoute } from '@/lib/auth-guard';
import PageContainer from '@/components/layout/page-container';
import FormsShowcasePage from '@/features/forms/components/forms-showcase-page';

export const metadata = {
  title: 'Multi-Step Checkout | Detour Car Rental'
};

export default async function Page() {
  await protectRoute();

  return (
    <PageContainer
      pageTitle='Self-Drive Rental Checkout'
      pageDescription='Multi-step reservation flow: select vehicle, choose scenic route, provide credentials, and review quote.'
    >
      <FormsShowcasePage />
    </PageContainer>
  );
}

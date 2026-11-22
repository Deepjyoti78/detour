import { protectRoute } from '@/lib/auth-guard';
import PageContainer from '@/components/layout/page-container';
import AdvancedFormPatterns from '@/features/forms/components/advanced-form-patterns';

export const metadata = {
  title: 'Insurance & Rental Policies | Detour Car Rental'
};

export default async function Page() {
  await protectRoute();

  return (
    <PageContainer
      pageTitle='Insurance Packages & Policy Terms'
      pageDescription='Configure collision damage waiver, roadside assistance tiers, and geographic driving limits.'
    >
      <AdvancedFormPatterns />
    </PageContainer>
  );
}

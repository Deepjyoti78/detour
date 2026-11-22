import { protectRoute } from '@/lib/auth-guard';
import PageContainer from '@/components/layout/page-container';
import DemoForm from '@/components/forms/demo-form';

export const metadata = {
  title: 'Standard Rental Contract | Detour Car Rental'
};

export default async function Page() {
  await protectRoute();

  return (
    <PageContainer
      pageTitle='Standard Rental Agreement'
      pageDescription='Primary rental contract with driver verification, license info, and deposit authorization.'
    >
      <DemoForm />
    </PageContainer>
  );
}

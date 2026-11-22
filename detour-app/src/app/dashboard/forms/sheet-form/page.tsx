import { protectRoute } from '@/lib/auth-guard';
import PageContainer from '@/components/layout/page-container';
import SheetFormDemo from '@/features/forms/components/sheet-form-demo';

export const metadata = {
  title: 'Vehicle Handover & Inspection | Detour Car Rental'
};

export default async function Page() {
  await protectRoute();

  return (
    <PageContainer
      pageTitle='Vehicle Handover & Inspection Sheet'
      pageDescription='Sheet-based pre-drive checklist: fuel level, existing marks, tire condition, and key handoff.'
    >
      <SheetFormDemo />
    </PageContainer>
  );
}

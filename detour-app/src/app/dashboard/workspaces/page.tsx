import { protectRoute } from '@/lib/auth-guard';
import WorkspacesView from './workspaces-view';

export const metadata = {
  title: 'Depot Workspaces | Detour Car Rental'
};

export default async function Page() {
  await protectRoute();
  return <WorkspacesView />;
}

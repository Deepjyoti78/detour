import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  try {
    const { userId } = await auth();
    if (!userId && process.env.DEMO_MODE !== 'true') {
      return redirect('/auth/sign-in');
    }
  } catch (err) {
    console.warn('Dashboard auth check fallback to overview:', err);
  }

  redirect('/dashboard/overview');
}

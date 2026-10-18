import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import DashboardNavbar from '@/components/dashboard/dashboard-navbar';
import OttPlatform from '@/components/ott/ott-platform';

export const metadata: Metadata = { title: 'OTT Platform - Twingface' };

export default async function OttPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return (
    <div className='app-shell page-enter' data-theme='dark'>
      <DashboardNavbar user={{ name: user.name, username: user.username, profileImage: user.profileImage }} />
      <main className='ott-page'>
        <OttPlatform />
      </main>
    </div>
  );
}

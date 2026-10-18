import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { safeMediaWorldListingSelect } from '@/lib/mediaworld';
import DashboardNavbar from '@/components/dashboard/dashboard-navbar';
import MediaWorldPlatform from '@/components/mediaworld/mediaworld-platform';

export const metadata = { title: 'MediaWorld - Twingface' };

export default async function MediaworldPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  const rows = await prisma.marketplaceListing.findMany({
    where: { status: 'AVAILABLE' },
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    take: 25,
    select: safeMediaWorldListingSelect,
  });
  return (
    <div className='app-shell page-enter' data-theme='dark'>
      <DashboardNavbar user={{ name: user.name, username: user.username, profileImage: user.profileImage }} />
      <main className='mediaworld-page'>
        <MediaWorldPlatform initialListings={rows} />
      </main>
    </div>
  );
}



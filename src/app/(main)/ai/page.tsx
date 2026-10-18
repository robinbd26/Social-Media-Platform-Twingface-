import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import DashboardNavbar from '@/components/dashboard/dashboard-navbar';
import TwingfaceAiWorkspace from '@/components/ai/twingface-ai-workspace';

export const metadata: Metadata = { title: 'Twingface AI - Twingface' };

export default async function AiPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return (
    <div className='app-shell page-enter' data-theme='dark'>
      <DashboardNavbar user={{ name: user.name, username: user.username, profileImage: user.profileImage }} />
      <TwingfaceAiWorkspace user={{ name: user.name, username: user.username, profileImage: user.profileImage }} />
    </div>
  );
}

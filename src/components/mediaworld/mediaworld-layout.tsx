'use client';

import { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar';
import MediaWorldSidebarFilters from '@/components/mediaworld/mediaworld-sidebar-filters';
import MediaWorldContent from '@/components/mediaworld/mediaworld-content';
import type { MediaWorldListing } from '@/lib/mediaworld';

export default function MediaWorldLayout({
  user,
  initialListings,
}: {
  user: { name: string; username: string; profileImage?: string | null };
  initialListings: MediaWorldListing[];
}) {
  const [filters, setFilters] = useState({
    query: '',
    category: '',
    division: '',
    district: '',
    minBudget: '',
    maxBudget: '',
  });

  return (
    <div className='dashboard-grid'>
      <div className='sidebar-wrapper'>
        <DashboardSidebar user={user} />
        <MediaWorldSidebarFilters filters={filters} onFilter={setFilters} />
      </div>
      <MediaWorldContent
        filters={filters}
        onFilter={setFilters}
        initialListings={initialListings}
      />
    </div>
  );
}



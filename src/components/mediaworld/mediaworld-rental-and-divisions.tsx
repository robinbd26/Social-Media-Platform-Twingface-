import Link from 'next/link';
import type { MediaWorldDivisionGroup, MediaWorldListing } from '@/lib/mediaworld';

export function MediaWorldInquiryCard({ listing }: { listing: MediaWorldListing }) {
  return (
    <article className="fb-card surface" data-testid={`inquiry-${listing.id}`}>
      <div className="fb-card-head">
        <h3>Contact about &quot;{listing.title}&quot;</h3>
        <p className="text-xs text-[#b0b3b8]">Casting/hiring/rental requests go through marketplace messaging.</p>
      </div>
      <div className="mt-3 flex gap-2">
        <Link className="fb-btn fb-btn-primary flex-1" href={`/marketplace/${listing.id}`}>Open conversation</Link>
      </div>
    </article>
  );
}

export function MediaWorldDivisionsList({ divisions }: { divisions: MediaWorldDivisionGroup[] }) {
  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {divisions.map((group) => (
        <div key={group.division} className='fb-card surface'>
          <h3 className='text-sm font-semibold text-[#e4e6eb]'>{group.division}</h3>
          <div className='mt-2 flex flex-wrap gap-2'>
            {group.items.map((listing) => (
              <Link
                key={listing.id}
                className='flex min-w-0 flex-1 items-center gap-2 rounded-lg px-2 py-1 text-xs text-[#b0b3b8] transition hover:underline'
                href={`/marketplace/${listing.id}`}
              >
                {listing.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function MediaWorldDivisionsSidebar({
  divisions,
  selectedDivision,
  onSelectDivision,
}: {
  divisions: MediaWorldDivisionGroup[];
  selectedDivision: string;
  onSelectDivision: (division: string) => void;
}) {
  return (
    <nav className='space-y-2' data-testid='divisions-sidebar'>
      {divisions.map((group) => (
        <button
          key={group.division}
          type='button'
          className={
            `w-full rounded-xl px-3 py-2 text-left text-sm transition ${
              selectedDivision === group.division
                ? 'bg-[#2d88ff]/20 text-[#2d88ff]'
                : 'bg-[#1e1f22] text-[#b0b3b8] hover:bg-[#2a2c30]'
            }`
          }
          onClick={() => onSelectDivision(group.division)}
        >
          {group.division}
          <span className='ml-auto text-xs opacity-60'>{group.items.length}</span>
        </button>
      ))}
    </nav>
  );
}

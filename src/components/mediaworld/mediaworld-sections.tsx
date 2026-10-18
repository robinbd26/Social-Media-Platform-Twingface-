import Link from 'next/link';
import type { MediaWorldListing } from '@/lib/mediaworld';

export function MediaWorldProfileCard({ profile }: { profile: NonNullable<MediaWorldListing['seller']> }) {
  return (
    <article className="fb-card surface" data-testid="mediaworld-profile-card">
      <div className="fb-card-head">
        <div className="flex items-center gap-3">
          {profile.profileImage ? (
            <img className="h-12 w-12 rounded-full object-cover" src={profile.profileImage} alt="" />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2d88ff]/20 text-sm font-bold text-[#2d88ff]">
              {profile.name.trim().charAt(0).toUpperCase() || 'U'}
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-[#e4e6eb]">{profile.name}</h3>
            {profile.profession ? <p className="text-xs text-[#b0b3b8]">{profile.profession}</p> : null}
          </div>
          <Link className="fb-btn fb-btn-primary" href={`/${profile.username}`}>View Profile</Link>
        </div>
      </div>

      {profile.bio ? (
        <div className="space-y-2 text-sm">
          <p className="text-[#b0b3b8]">{profile.bio}</p>
        </div>
      ) : null}
    </article>
  );
}


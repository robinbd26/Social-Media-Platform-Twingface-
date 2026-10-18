'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { MediaWorldListing } from '@/lib/mediaworld';
import {
  DISTRICTS_BY_DIVISION,
  MEDIA_WORLD_CATEGORY_LABELS,
  MEDIAWORLD_DIVISIONS,
} from '@/lib/mediaworld';

const NAV_ITEMS = [
  { key: 'home', label: 'Home', icon: '⌂' },
  { key: 'featured', label: 'Featured Services', icon: '✦' },
  { key: 'rentals', label: 'Top Rentals', icon: '🎬' },
  { key: 'spots', label: 'Top Spots', icon: '🏡' },
  { key: 'talent', label: 'Verified Talent', icon: '⭐' },
] as const;

type CategoryKey =
  | 'CAMERA_HOUSE'
  | 'DIRECTOR'
  | 'DRONE'
  | 'SPOT'
  | 'LIGHT_HOUSE'
  | 'SHOOTING_BUS_CAR'
  | 'PRODUCTION'
  | 'MAKEUP_MAN'
  | 'ARTIST';

const SERVICE_CATEGORIES: ReadonlyArray<{ key: CategoryKey; label: string; icon: string }> = [
  { key: 'CAMERA_HOUSE', label: 'Camera Rental', icon: '📷' },
  { key: 'DIRECTOR', label: 'Director & Crew', icon: '🎬' },
  { key: 'DRONE', label: 'Drone Service', icon: '🚁' },
  { key: 'SPOT', label: 'Shooting Spot', icon: '🏡' },
  { key: 'LIGHT_HOUSE', label: 'Light Setup', icon: '💡' },
  { key: 'SHOOTING_BUS_CAR', label: 'Transport', icon: '🚐' },
  { key: 'PRODUCTION', label: 'Post Production', icon: '🎛️' },
  { key: 'MAKEUP_MAN', label: 'Makeup & Styling', icon: '✨' },
  { key: 'ARTIST', label: 'Artist & Model', icon: '🎭' },
];

const DISCOVERY_CATEGORIES: ReadonlyArray<{
  key: CategoryKey;
  title: string;
  description: string;
  icon: string;
  tone: 'rose' | 'blue' | 'amber' | 'cyan' | 'violet' | 'yellow' | 'teal' | 'indigo';
}> = [
  { key: 'ARTIST', title: 'Artist and actor', description: 'Actor, Drama, Movie', icon: '🎭', tone: 'rose' },
  { key: 'CAMERA_HOUSE', title: 'Cameras and lenses', description: 'Sony, RED, Arri, Canon', icon: '📷', tone: 'blue' },
  { key: 'SPOT', title: 'Shooting spot and house', description: 'Indoor, Outdoor, Resort', icon: '🏠', tone: 'amber' },
  { key: 'DRONE', title: 'Drones and operators', description: '4K, FPV, Aerial Shot', icon: '🚁', tone: 'cyan' },
  { key: 'DIRECTOR', title: 'Director and DOP', description: 'Director, Cinematographer', icon: '🎥', tone: 'violet' },
  { key: 'MAKEUP_MAN', title: 'Makeup & Styling', description: 'Hair, Makeup, Styling', icon: '✨', tone: 'violet' },
  { key: 'LIGHT_HOUSE', title: 'Light setup and grip', description: 'Aputure, Godox, HMI', icon: '💡', tone: 'yellow' },
  { key: 'SHOOTING_BUS_CAR', title: 'Shooting car', description: 'Van, Micro, Premar Car', icon: '🚐', tone: 'teal' },
  { key: 'PRODUCTION', title: 'Studio and post production', description: 'Color grading, editing, dubbing', icon: '🎛️', tone: 'indigo' },
];

const POPULAR_TAGS = ['#SonyFX3', '#RED Camera', '#ShootingSpot', '#DroneRental', '#FemaleModel'] as const;

const BUDGET_OPTIONS: ReadonlyArray<{ value: string; label: string }> = [
  { value: '', label: 'সর্বোচ্চ বাজেট' },
  { value: '500', label: '৳ 500' },
  { value: '1000', label: '৳ 1,000' },
  { value: '3000', label: '৳ 3,000' },
  { value: '5000', label: '৳ 5,000' },
  { value: '10000', label: '৳ 10,000' },
  { value: '20000', label: '৳ 20,000+' },
];

function formatRate(pricePaisa: number): string {
  return `৳ ${(pricePaisa / 100).toLocaleString('en-US')} / দিন`;
}

function ServiceCard({ item }: { item: MediaWorldListing }) {
  const cover = item.images?.[0]?.url ?? null;
  const categoryLabel =
    MEDIA_WORLD_CATEGORY_LABELS[item.category as keyof typeof MEDIA_WORLD_CATEGORY_LABELS] ?? item.category;
  const icon = SERVICE_CATEGORIES.find((c) => c.key === item.category)?.icon ?? '📦';
  return (
    <article className='mediaworld-service-card' aria-label={item.title}>
      {cover ? (
        <img src={cover} alt={item.title} className='mediaworld-card-cover' />
      ) : (
        <div className='mediaworld-card-cover mediaworld-card-placeholder'>{icon}</div>
      )}
      <div className='mediaworld-card-body'>
        <div className='mediaworld-card-header'>
          <span className='mediaworld-card-badge'>{categoryLabel}</span>
        </div>
        <h3 className='mediaworld-card-title'>{item.title}</h3>
        <span className='mediaworld-card-loc'>📍 {item.location || 'Bangladesh'}</span>
        <div className='mediaworld-card-price-line'>
          <span className='mediaworld-card-price'>{formatRate(item.pricePaisa)}</span>
          <span className='mediaworld-card-rating'>★ 4.9</span>
        </div>
        <Link href={`/marketplace/${item.id}`} className='mediaworld-card-cta'>
          বিস্তারিত দেখুন
        </Link>
      </div>
    </article>
  );
}

function ServiceRail({ title, items }: { title: string; items: MediaWorldListing[] }) {
  return (
    <section className='mediaworld-rail' aria-label={title}>
      <div className='mediaworld-section-head'>
        <h2>{title}</h2>
        <button type='button' className='mediaworld-see-all'>
          দেখুন সব <span>→</span>
        </button>
      </div>
      <div className='mediaworld-poster-grid'>
        {items.map((item) => (
          <ServiceCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function AvailableServiceCard({ item }: { item: MediaWorldListing }) {
  const cover = item.images?.[0]?.url ?? null;
  const categoryLabel =
    MEDIA_WORLD_CATEGORY_LABELS[item.category as keyof typeof MEDIA_WORLD_CATEGORY_LABELS] ?? item.category;
  const icon = SERVICE_CATEGORIES.find((category) => category.key === item.category)?.icon ?? '📦';

  return (
    <article className='mediaworld-available-card' aria-label={item.title}>
      <div className='mediaworld-available-image'>
        {cover ? <img src={cover} alt={item.title} /> : <span>{icon}</span>}
        <span className='mediaworld-available-badge'>{categoryLabel}</span>
        <span className='mediaworld-verified-badge'>● Verified</span>
      </div>
      <div className='mediaworld-available-body'>
        <div className='mediaworld-available-meta'>
          <span>📍 {item.location || 'Bangladesh'}</span>
          <span>★ 4.9 (28)</span>
        </div>
        <h3>{item.title}</h3>
        <p>{item.description || 'Professional media support available for your next production.'}</p>
        <div className='mediaworld-available-footer'>
          <div>
            <small>Daily charge</small>
            <strong>{formatRate(item.pricePaisa).replace(' / দিন', '')}</strong>
          </div>
          <Link href={`/marketplace/${item.id}`}>Details / Booking</Link>
        </div>
      </div>
    </article>
  );
}

export default function MediaWorldPlatform({
  initialListings,
}: {
  initialListings: MediaWorldListing[];
}) {
  const [activeNav, setActiveNav] = useState('home');
  const [activeCategory, setActiveCategory] = useState<CategoryKey | 'ALL'>('ALL');
  const [activeDivision, setActiveDivision] = useState('');
  const [activeDistrict, setActiveDistrict] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [listings, setListings] = useState<MediaWorldListing[]>(initialListings);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const districts = useMemo(
    () =>
      activeDivision
        ? [...(DISTRICTS_BY_DIVISION[activeDivision as keyof typeof DISTRICTS_BY_DIVISION] ?? [])]
        : ([] as string[]),
    [activeDivision]
  );

  // Fetch from /api/mediaworld whenever query/category/division/district change.
  useEffect(() => {
    let cancelled = false;
    async function fetchListings() {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams();
        if (appliedQuery.trim()) params.set('q', appliedQuery.trim());
        if (activeCategory !== 'ALL') params.set('category', activeCategory);
        if (activeDistrict) params.set('district', activeDistrict);
        else if (activeDivision) params.set('division', activeDivision);
        const response = await fetch(`/api/mediaworld?${params}`);
        const body = await response.json().catch(() => null);
        if (!response.ok) {
          if (!cancelled) setError(body?.error || 'তালিকা লোড করতে সমস্যা হচ্ছে।');
          return;
        }
        if (!cancelled) setListings(body.listings ?? []);
      } catch {
        if (!cancelled) setError('কানেকশন পরীক্ষা করে আবার চেষ্টা করুন।');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchListings();
    return () => {
      cancelled = true;
    };
  }, [appliedQuery, activeCategory, activeDivision, activeDistrict]);

  function submitSearch(event: React.FormEvent) {
    event.preventDefault();
    setAppliedQuery(searchInput);
  }

  function pickTag(tag: string) {
    const plain = tag.replace(/^#/, '');
    setSearchInput(plain);
    setAppliedQuery(plain);
  }

  function resetDivision(nextDivision: string) {
    setActiveDivision(nextDivision);
    setActiveDistrict('');
  }

  // Client-side budget filter on top of API results.
  const visible = useMemo(() => {
    if (!maxBudget) return listings;
    const budgetPaise = Number(maxBudget) * 100;
    return listings.filter((item) => item.pricePaisa <= budgetPaise);
  }, [listings, maxBudget]);

  const rentalCategories = new Set(['CAMERA_HOUSE', 'DRONE', 'LIGHT_HOUSE']);
  const talentCategories = new Set(['DIRECTOR', 'ARTIST', 'PRODUCTION', 'MAKEUP_MAN']);
  const spotCategories = new Set(['SPOT', 'SHOOTING_BUS_CAR']);

  const rentals = visible.filter((item) => rentalCategories.has(item.category));
  const talent = visible.filter((item) => talentCategories.has(item.category));
  const spots = visible.filter((item) => spotCategories.has(item.category));
  const fallback = visible.filter(
    (item) => !rentalCategories.has(item.category) && !talentCategories.has(item.category) && !spotCategories.has(item.category)
  );

  return (
    <section className='mediaworld-platform-layout' aria-label='TwingFace Media World'>
      <aside className='mediaworld-sidebar'>
        <div className='mediaworld-sidebar-title'>
          <span>🎬</span>
          <div>
            <strong>TwingFace Media World</strong>
            <small>শুটিং সাপোর্ট ডিরেক্টরি</small>
          </div>
        </div>

        <nav className='mediaworld-navigation' aria-label='MediaWorld navigation'>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              type='button'
              className={activeNav === item.key ? 'active' : ''}
              onClick={() => setActiveNav(item.key)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className='mediaworld-sidebar-divider' />

        <div className='mediaworld-category-menu'>
          <label className='mediaworld-menu-label'>ক্যাটাগরি ফিল্টার</label>
          <div className='mediaworld-category-list'>
            <button
              type='button'
              className={activeCategory === 'ALL' ? 'active' : ''}
              onClick={() => setActiveCategory('ALL')}
            >
              সব ক্যাটাগরি
            </button>
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type='button'
                className={activeCategory === cat.key ? 'active' : ''}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className='mediaworld-division-menu'>
          <label className='mediaworld-menu-label'>বিভাগ ফিল্টার</label>
          <div className='mediaworld-division-list'>
            <button
              type='button'
              className={!activeDivision ? 'active' : ''}
              onClick={() => resetDivision('')}
            >
              সব বিভাগ
            </button>
            {MEDIAWORLD_DIVISIONS.map((division) => (
              <button
                key={division}
                type='button'
                className={activeDivision === division ? 'active' : ''}
                onClick={() => resetDivision(division)}
              >
                {division}
              </button>
            ))}
          </div>
        </div>

        <div className='mediaworld-premium-promo'>
          <span>✦ সার্ভিস পোস্ট করুন</span>
          <strong>আপনার সার্ভিসটি তালিকাভুক্ত করুন</strong>
          <p>টুইংফেস মিডিয়া ওয়ার্ল্ডে আপনার পেশাদার প্রোফাইল তৈরি করুন এবং শুটিং কন্ট্রাক্ট পান।</p>
          <Link href='/mediaworld/register' className='mediaworld-promo-button'>
            এখন রেজিস্টার করুন <b>→</b>
          </Link>
        </div>
      </aside>

      <main className='mediaworld-main mediaworld-main-cinematic'>
        <section className='mediaworld-hero-card'>
          <div className='mediaworld-hero-background' aria-hidden='true' />
          <div className='mediaworld-hero-content'>
            <div className='mediaworld-hero-copy'>
              <p className='mediaworld-hero-eyebrow'>TwingFace Media World Directory</p>
              <h1>শুটিংয়ের সব সাপোর্ট এক ছাদের নিচে — TwingFace Media World</h1>
              <p className='mediaworld-hero-subtitle'>
                বাংলাদেশের সেরা মিডিয়া প্রফেশনাল এবং ইকুইপমেন্ট রেন্টাল সার্ভিস খুঁজুন।
              </p>
            </div>

            <form className='mediaworld-search-row' onSubmit={submitSearch} role='search'>
            <label className='mediaworld-filter-label' htmlFor='mw-search' style={{ position: 'absolute', left: -9999 }}>
              অনুসন্ধান
            </label>
            <input
              id='mw-search'
              type='search'
              className='mediaworld-filter-input'
              placeholder='শিল্পী, সরঞ্জাম বা লোকেশন...'
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <button type='submit' className='mediaworld-search-btn'>
              খুঁজুন
            </button>
            </form>

            <div className='mediaworld-hero-filters-4'>
            <div className='mediaworld-filter-group'>
              <label className='mediaworld-filter-label' htmlFor='mw-cat'>
                ক্যাটাগরি
              </label>
              <select
                id='mw-cat'
                className='mediaworld-filter-select'
                value={activeCategory === 'ALL' ? '' : activeCategory}
                onChange={(event) =>
                  setActiveCategory((event.target.value as CategoryKey) || 'ALL')
                }
              >
                <option value=''>সব ক্যাটাগরি</option>
                {SERVICE_CATEGORIES.map((cat) => (
                  <option key={cat.key} value={cat.key}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div className='mediaworld-filter-group'>
              <label className='mediaworld-filter-label' htmlFor='mw-div'>
                বিভাগ
              </label>
              <select
                id='mw-div'
                className='mediaworld-filter-select'
                value={activeDivision}
                onChange={(event) => resetDivision(event.target.value)}
              >
                <option value=''>সব বিভাগ</option>
                {MEDIAWORLD_DIVISIONS.map((division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
            </div>
            <div className='mediaworld-filter-group'>
              <label className='mediaworld-filter-label' htmlFor='mw-dist'>
                জেলা
              </label>
              <select
                id='mw-dist'
                className='mediaworld-filter-select'
                value={activeDistrict}
                disabled={!activeDivision}
                onChange={(event) => setActiveDistrict(event.target.value)}
              >
                <option value=''>{activeDivision ? 'সব জেলা' : 'বিভাগ নির্বাচন করুন'}</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
            <div className='mediaworld-filter-group'>
              <label className='mediaworld-filter-label' htmlFor='mw-budget'>
                সর্বোচ্চ বাজেট
              </label>
              <select
                id='mw-budget'
                className='mediaworld-filter-select'
                value={maxBudget}
                onChange={(event) => setMaxBudget(event.target.value)}
              >
                {BUDGET_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            </div>

            <div className='mediaworld-tag-chips' aria-label='Popular searches'>
            {POPULAR_TAGS.map((tag) => (
              <button key={tag} type='button' className='mediaworld-tag-chip' onClick={() => pickTag(tag)}>
                {tag}
              </button>
            ))}
            </div>
          </div>
        </section>

        <section className='mediaworld-service-categories' aria-labelledby='mediaworld-service-categories-title'>
          <div className='mediaworld-category-heading'>
            <div>
              <p>Service category</p>
              <h2 id='mediaworld-service-categories-title'>Choose the media category you need.</h2>
            </div>
            <span>Verified professionals and equipment suitable for every step of shooting production.</span>
          </div>
          <div className='mediaworld-category-grid'>
            {DISCOVERY_CATEGORIES.map((category, index) => (
              <button
                key={`${category.key}-${index}`}
                type='button'
                className={`mediaworld-discovery-card tone-${category.tone}${activeCategory === category.key ? ' active' : ''}`}
                onClick={() => setActiveCategory(category.key)}
              >
                <span className='mediaworld-discovery-icon'>{category.icon}</span>
                <strong>{category.title}</strong>
                <small>{category.description}</small>
              </button>
            ))}
            <button
              type='button'
              className={`mediaworld-discovery-card mediaworld-discovery-all${activeCategory === 'ALL' ? ' active' : ''}`}
              onClick={() => setActiveCategory('ALL')}
            >
              <span className='mediaworld-discovery-icon'>▦</span>
              <strong>See all services</strong>
              <small>All directories →</small>
            </button>
          </div>
        </section>

        <section className='mediaworld-available-services' aria-labelledby='mediaworld-available-services-title'>
          <div className='mediaworld-available-heading'>
            <div>
              <h2 id='mediaworld-available-services-title'>List of available services and fares</h2>
              <p>Showing: {Math.min(visible.length, 8)} posts</p>
            </div>
            <div className='mediaworld-available-filters' aria-label='Available service filters'>
              <button type='button' className={activeCategory === 'ALL' ? 'active' : ''} onClick={() => setActiveCategory('ALL')}>All</button>
              <button type='button' className={activeCategory === 'CAMERA_HOUSE' ? 'active' : ''} onClick={() => setActiveCategory('CAMERA_HOUSE')}>Camera</button>
              <button type='button' className={activeCategory === 'ARTIST' ? 'active' : ''} onClick={() => setActiveCategory('ARTIST')}>Artist</button>
              <button type='button' className={activeCategory === 'SPOT' ? 'active' : ''} onClick={() => setActiveCategory('SPOT')}>Shooting spot</button>
              <button type='button' className={activeCategory === 'DRONE' ? 'active' : ''} onClick={() => setActiveCategory('DRONE')}>Drone</button>
            </div>
          </div>
          <div className='mediaworld-available-grid'>
            {visible.slice(0, 8).map((item) => (
              <AvailableServiceCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {loading && <div className='mediaworld-loading'>লোড হচ্ছে...</div>}
        {error && (
          <div className='mediaworld-empty' role='alert'>
            <strong className='text-slate-300'>{error}</strong>
            <button
              type='button'
              className='mediaworld-cta-button'
              onClick={() => {
                setError('');
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 600);
              }}
            >
              পুনরায় চেষ্টা করুন
            </button>
          </div>
        )}

        <div className='mediaworld-rails'>
          {rentals.length > 0 && <ServiceRail title='জনপ্রিয় সরঞ্জাম রেন্টাল' items={rentals} />}
          {talent.length > 0 && <ServiceRail title='ফিচারড ট্যালেন্ড ও ক্রু' items={talent} />}
          {spots.length > 0 && <ServiceRail title='শীর্ষ শুটিং স্পট' items={spots} />}
          {fallback.length > 0 && (
            <section className='mediaworld-rail mediaworld-rail-misc' aria-label='Others'>
              <div className='mediaworld-section-head'>
                <h2>অন্যান্য সার্ভিস</h2>
                <button type='button' className='mediaworld-see-all'>দেখুন সব <span>→</span></button>
              </div>
              <div className='mediaworld-poster-grid'>
                {fallback.map((item) => (
                  <ServiceCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}
        </div>

        {visible.length === 0 && !loading && !error && (
          <div className='mediaworld-empty'>
            <strong className='text-slate-300'>কোনো সার্ভিস পাওয়া যায়নি</strong>
            <p className='mt-2 text-sm text-slate-500'>
              অনুরোধটি ঠিক করুন অথবা আপনার জেলায় প্রথম পোস্ট করুন।
            </p>
            <Link className='mt-4 mediaworld-cta-button' href='/mediaworld/register'>
              পোস্ট করুন
            </Link>
          </div>
        )}

        <section className='mediaworld-cta-banner'>
          <div>
            <h3>আপনার সার্ভিসটি হাজারো মানুষের কাছে পৌঁছে দিন</h3>
            <p>টুইংফেস মিডিয়া ওয়ার্ল্ডে নিজের সার্ভিস ফ্রি লিস্ট করুন।</p>
          </div>
          <Link href='/mediaworld/register' className='mediaworld-cta-button'>
            ফ্রি লিস্ট দিন <b>→</b>
          </Link>
        </section>

        <footer className='mediaworld-directory-footer'>
          <div className='mediaworld-footer-grid'>
            <div className='mediaworld-footer-brand'>
              <h3><span>▰</span> Twing<span>Face</span> Media World</h3>
              <p>A trusted directory for drama, cinema, advertising and digital content production across Bangladesh.</p>
              <div className='mediaworld-footer-socials' aria-label='Social media links'>
                <a href='#facebook' aria-label='Facebook'>f</a><a href='#youtube' aria-label='YouTube'>▶</a><a href='#instagram' aria-label='Instagram'>◎</a>
              </div>
            </div>
            <div><h4>Categories</h4><a href='#camera'>Cameras and lenses</a><a href='#artist'>Artist database</a><a href='#spot'>Shooting spot Dhaka</a><a href='#drone'>Drone coverage</a><a href='#transport'>Production transport</a></div>
            <div><h4>Popular Category</h4><a href='#dhaka'>Dhaka Division</a><a href='#chattogram'>Chattogram and Cox&apos;s Bazar</a><a href='#sylhet'>Sylhet Division</a><a href='#rajshahi'>Rajshahi Division</a><a href='#khulna'>Khulna Division</a></div>
            <div><h4>Contact and Help</h4><a href='tel:+8801700000000'>☎ +880 1700-00000</a><a href='mailto:support@twingface.com'>✉ support@twingface.com</a><span>● Nikunja-2, Khilkhet, Dhaka-1229</span></div>
          </div>
          <div className='mediaworld-footer-bottom'><span>© 2026 TwingFace Media World. All rights reserved.</span><nav aria-label='Footer links'><a href='#privacy'>Privacy Policy</a><a href='#terms'>Terms and conditions</a><a href='#sitemap'>Sitemap</a></nav></div>
        </footer>
      </main>
    </section>
  );
}

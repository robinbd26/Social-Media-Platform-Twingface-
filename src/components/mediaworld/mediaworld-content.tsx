'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { MediaWorldListing } from '@/lib/mediaworld';
import { MEDIA_WORLD_CATEGORY_LABELS } from '@/lib/mediaworld';

const MEDIA_CATEGORIES = [
  { key: 'CAMERA_HOUSE', label: 'ক্যামেরা রেন্টাল' },
  { key: 'DIRECTOR', label: 'পরিচালক ও ক্রু' },
  { key: 'ARTIST', label: 'শিল্পী ও মডেল' },
  { key: 'DRONE', label: 'ড্রোন সার্ভিস' },
  { key: 'SPOT', label: 'শুটিং স্পট' },
  { key: 'LIGHT_HOUSE', label: 'লাইট সেটআপ' },
  { key: 'SHOOTING_BUS_CAR', label: 'পরিবহন' },
  { key: 'PRODUCTION', label: 'পোস্ট প্রোডাকশন' },
] as const;

function formatBdt(pricePaisa: number): string {
  return `৳${(pricePaisa / 100).toLocaleString('en-US')}`;
}

export default function MediaWorldContent({
  filters,
  onFilter,
  initialListings,
}: {
  filters: {
    query: string;
    category: string;
    division: string;
    district: string;
    minBudget: string;
    maxBudget: string;
  };
  onFilter: (next: {
    query: string;
    category: string;
    division: string;
    district: string;
    minBudget: string;
    maxBudget: string;
  }) => void;
  initialListings: MediaWorldListing[];
}) {
  const [listings, setListings] = useState<MediaWorldListing[]>(initialListings);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function fetchListings() {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams();
        if (filters.query.trim()) params.set('q', filters.query.trim());
        if (filters.category) params.set('category', filters.category);
        if (filters.district) params.set('district', filters.district);
        else if (filters.division) params.set('division', filters.division);
        const response = await fetch(`/api/mediaworld?${params}`);
        const body = await response.json().catch(() => null);
        if (!response.ok) {
          setError(body?.error || 'তালিকা লোড করতে সমস্যা হচ্ছে।');
          return;
        }
        if (!cancelled) setListings(body.listings || []);
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
  }, [filters.query, filters.category, filters.division, filters.district]);

  return (
    <div className='space-y-6'>
      <div className='rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8 shadow-lg'>
        <div className='flex flex-col md:flex-row md:items-end gap-4'>
          <div className='flex-1'>
            <h2 className='text-xl font-extrabold text-white tracking-tight leading-tight'>
              শুটিংয়ের সব সাপোর্ট এক ছাদের নিচে — TwingFace Media World
            </h2>
            <p className='mt-2 text-sm text-slate-400'>
              বাংলাদেশের সেরা মিডিয়া প্রফেশনাল এবং ইকুইপমেন্ট রেন্টাল সার্ভিস খুঁজুন।
            </p>
          </div>
          <div className='w-full md:w-96 relative'>
            <input
              type='search'
              className='w-full rounded-xl border-0 bg-[#1e1f22] px-4 py-3 text-sm text-[#e4e6eb] placeholder:text-[#6b7076] focus:outline-none focus:ring-2 focus:ring-[#2d88ff]/40'
              placeholder='শিল্পী, সরঞ্জাম বা লোকেশন খুঁজুন...'
              value={filters.query}
              onChange={(e) => {
                onFilter({ ...filters, query: e.target.value });
              }}
            />
            <button
              className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white'
              aria-label='অনুসন্ধান'
            >
              🔍
            </button>
          </div>
        </div>
      </div>
      {/* Category Chips */}
      <div className='flex flex-wrap gap-2'>
        {MEDIA_CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            type='button'
            onClick={() =>
              onFilter({ ...filters, category: cat.key, division: '', district: '' })
            }
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filters.category === cat.key
                ? 'bg-[#2d88ff]/20 text-[#2d88ff] border border-[#2d88ff]/40'
                : 'bg-[#1e1f22] text-slate-400 hover:bg-[#2a2c30] border border-transparent'
            }`}
          >
            {cat.label}
          </button>
        ))}
        <button
          type='button'
          onClick={() =>
            onFilter({ ...filters, category: '', division: '', district: '' })
          }
          className='px-3 py-2 rounded-full text-xs font-medium text-slate-400 bg-[#1e1f22] hover:bg-[#2a2c30]'
        >
          সব Reset
        </button>
      </div>

      {error ? (
        <p role='alert' className='text-slate-400 text-sm'>{error}</p>
      ) : loading ? (
        <p className='text-slate-400 text-sm'>লোডিং হচ্ছে...</p>
      ) : listings.length ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {listings.map((listing) => (
            <article
              key={listing.id}
              className='p-0 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 hover:border-[#2d88ff]/50 transition group'
            >
              {listing.images.find((img) => img.url) ? (
                <img
                  src={listing.images.find((img) => img.url)!.url}
                  alt={listing.title}
                  className='w-full h-48 object-cover'
                />
              ) : null}
              <div className='p-4'>
                <div className='flex items-start justify-between gap-2 mb-2'>
                  <h3 className='text-sm font-semibold text-[#e4e6eb] line-clamp-1'>
                    {listing.title}
                  </h3>
                  <span className='rounded-full bg-[#2d88ff]/20 px-2 py-1 text-[10px] font-semibold text-[#2d88ff]'>
                    {MEDIA_WORLD_CATEGORY_LABELS[listing.category as keyof typeof MEDIA_WORLD_CATEGORY_LABELS] ?? listing.category}
                  </span>
                </div>
                <p className='text-xs text-[#b0b3b8] mb-3'>{listing.location}</p>
                <div className='flex items-center justify-between mb-3'>
                  <span className='text-sm font-bold text-[#e4e6eb]'>
                    {formatBdt(listing.pricePaisa)}
                  </span>
                  <span className='text-xs text-slate-500'>★ 4.9</span>
                </div>
                <Link
                  href={`/${listing.seller?.username ?? 'placeholder'}`}
                  className='w-full rounded-xl bg-[#2d88ff] px-4 py-2.5 text-sm font-bold text-white text-center hover:bg-[#2d88ff]/90'
                >
                  বিস্তারিত দেখুন
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className='empty-feed surface text-center py-12'>
          <strong className='text-slate-300'>কোনো তালিকা পাওয়া যায়নি</strong>
          <p className='mt-2 text-sm text-slate-500'>
            অপর ফিল্টার চেষ্টা করুন, অথবা আপনার জেলায় প্রথম পোস্ট করুন।
          </p>
          <Link className='mt-4 fb-btn fb-btn-primary' href='/marketplace/create'>
            পোস্ট করুন
          </Link>
        </div>
      )}

      {/* CTA Banner */}
      <div className='rounded-2xl border border-slate-800 bg-[#1a1b1e] p-6 md:p-8 shadow-lg'>
        <div className='flex flex-col md:flex-row md:items-center gap-4'>
          <div className='flex-1'>
            <h3 className='text-lg font-bold text-white'>
              আপনার সার্ভিসটি হাজারো মানুষের কাছে পৌঁছে দিন
            </h3>
            <p className='mt-1 text-sm text-slate-400'>
              টুইংফেস মিডিয়া ওয়ার্ল্ডে আপনার পেশাদার প্রোফাইল তৈরি করুন এবং শুটিং কন্ট্রাক্ট পান।
            </p>
          </div>
          <Link
            href='/mediaworld/register'
            className='rounded-xl bg-[#2d88ff] px-5 py-3 text-sm font-bold text-white text-center hover:bg-[#2d88ff]/90'
          >
            এখন রেজিস্টার করুন
          </Link>
        </div>
      </div>
    </div>
  );
}

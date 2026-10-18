'use client';

import { useState } from 'react';
import {
  MEDIA_WORLD_CATEGORIES,
  MEDIA_WORLD_CATEGORY_LABELS,
  MEDIAWORLD_DIVISIONS,
} from '@/lib/mediaworld';
import { DISTRICTS_BY_DIVISION } from '@/lib/constants';

export type MediaWorldSidebarFilters = {
  query: string;
  category: string;
  division: string;
  district: string;
  minBudget: string;
  maxBudget: string;
};

export default function MediaWorldSidebarFilters({
  filters,
  onFilter,
}: {
  filters: MediaWorldSidebarFilters;
  onFilter: (next: MediaWorldSidebarFilters) => void;
}) {
  const [division, setDivision] = useState(filters.division);
  const [district, setDistrict] = useState(filters.district);
  const [category, setCategory] = useState(filters.category);
  const [query, setQuery] = useState(filters.query);
  const [minBudget, setMinBudget] = useState(filters.minBudget);
  const [maxBudget, setMaxBudget] = useState(filters.maxBudget);

  const districts = division
    ? [...(DISTRICTS_BY_DIVISION[division as keyof typeof DISTRICTS_BY_DIVISION] ?? [])]
    : [];

  const handleChange = (next: Partial<MediaWorldSidebarFilters>) => {
    const updated = { ...filters, ...next };
    onFilter(updated);
  };

  return (
    <div className='mb-6 space-y-4'>
      <h3 className='text-xs font-bold uppercase tracking-wider text-slate-400'>দ্রুত ফিল্টার</h3>

      {/* Search */}
      <div>
        <input
          type='search'
          className='w-full rounded-xl border-0 bg-[#1e1f22] px-3 py-2 text-sm text-[#e4e6eb] placeholder:text-[#6b7076] focus:outline-none focus:ring-2 focus:ring-[#2d88ff]/40'
          placeholder='অনুসন্ধান করুন...'
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleChange({ query: e.target.value });
          }}
        />
      </div>

      {/* Category chips */}
      <div>
        <label className='block text-xs font-semibold text-slate-400 mb-2'>ক্যাটাগরি</label>
        <div className='flex flex-wrap gap-2'>
          {MEDIA_WORLD_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type='button'
              onClick={() => {
                setCategory(cat);
                handleChange({ category: cat });
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                category === cat
                  ? 'bg-[#2d88ff]/20 text-[#2d88ff] border border-[#2d88ff]/40'
                  : 'bg-[#1e1f22] text-slate-400 hover:bg-[#2a2c30]'
              }`}
            >
              {MEDIA_WORLD_CATEGORY_LABELS[cat as keyof typeof MEDIA_WORLD_CATEGORY_LABELS]}
            </button>
          ))}
        </div>
      </div>

      {/* Division */}
      <div>
        <label className='block text-xs font-semibold text-slate-400 mb-2'>বিভাগ</label>
        <select
          className='w-full rounded-xl border-0 bg-[#1e1f22] px-3 py-2 text-sm text-[#e4e6eb] focus:outline-none focus:ring-2 focus:ring-[#2d88ff]/40'
          value={division}
          onChange={(e) => {
            setDivision(e.target.value);
            setDistrict('');
            handleChange({ division: e.target.value, district: '' });
          }}
        >
          <option value=''>সব বিভাগ</option>
          {MEDIAWORLD_DIVISIONS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* District */}
      <div>
        <label className='block text-xs font-semibold text-slate-400 mb-2'>জেলা</label>
        <select
          className='w-full rounded-xl border-0 bg-[#1e1f22] px-3 py-2 text-sm text-[#e4e6eb] focus:outline-none focus:ring-2 focus:ring-[#2d88ff]/40'
          value={district}
          onChange={(e) => {
            setDistrict(e.target.value);
            handleChange({ district: e.target.value });
          }}
        >
          <option value=''>সব জেলা</option>
          {districts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Budget */}
      <div>
        <label className='block text-xs font-semibold text-slate-400 mb-2'>বাজেট (৳)</label>
        <div className='flex gap-2'>
          <input
            type='number'
            className='flex-1 rounded-xl border-0 bg-[#1e1f22] px-3 py-2 text-sm text-[#e4e6eb] focus:outline-none focus:ring-2 focus:ring-[#2d88ff]/40'
            placeholder='সর্বনিম্ন'
            value={minBudget}
            onChange={(e) => {
              setMinBudget(e.target.value);
              handleChange({ minBudget: e.target.value });
            }}
          />
          <input
            type='number'
            className='flex-1 rounded-xl border-0 bg-[#1e1f22] px-3 py-2 text-sm text-[#e4e6eb] focus:outline-none focus:ring-2 focus:ring-[#2d88ff]/40'
            placeholder='সর্বোচ্চ'
            value={maxBudget}
            onChange={(e) => {
              setMaxBudget(e.target.value);
              handleChange({ maxBudget: e.target.value });
            }}
          />
        </div>
      </div>

      {/* Active filter chips */}
      {(filters.category || filters.division || filters.district || filters.query) && (
        <div className='flex flex-wrap gap-1'>
          {filters.category && (
            <span className='px-2 py-1 rounded bg-green-600/20 text-[10px] font-semibold text-green-400'>
              {MEDIA_WORLD_CATEGORY_LABELS[filters.category as keyof typeof MEDIA_WORLD_CATEGORY_LABELS]} ×
            </span>
          )}
          {filters.division && (
            <span className='px-2 py-1 rounded bg-green-600/20 text-[10px] font-semibold text-green-400'>
              {filters.division} ×
            </span>
          )}
          {filters.query && (
            <span className='px-2 py-1 rounded bg-green-600/20 text-[10px] font-semibold text-green-400'>
              &apos;{filters.query}&apos; ×
            </span>
          )}
        </div>
      )}
    </div>
  );
}



'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type Category = 'all' | 'artist' | 'director' | 'model' | 'camera' | 'drone' | 'spot' | 'light' | 'car' | 'studio';
type Listing = {
  id: number;
  category: Exclude<Category, 'all'>;
  title: string;
  subtitle: string;
  price: string;
  division: string;
  district: string;
  image: string;
  badge: string;
  rating: string;
};

const categories: Array<{ key: Exclude<Category, 'all'>; label: string; icon: string; description: string }> = [
  { key: 'artist', label: 'Artist & Model', icon: '🎭', description: 'অভিনয় শিল্পী, মডেল ও পারফর্মার' },
  { key: 'director', label: 'Director & Crew', icon: '🎬', description: 'পরিচালক, সহকারী ও প্রোডাকশন' },
  { key: 'camera', label: 'Camera Rental', icon: '📷', description: 'Cinema camera, lens ও rig' },
  { key: 'drone', label: 'Drone Service', icon: '🚁', description: 'Aerial video ও photography' },
  { key: 'spot', label: 'Shooting Spot', icon: '🏡', description: 'লোকেশন, স্টুডিও ও সেট' },
  { key: 'light', label: 'Light Setup', icon: '💡', description: 'Lighting, grip ও generator' },
  { key: 'car', label: 'Transport', icon: '🚐', description: 'শুটিং বাস, কার ও ভ্যান' },
  { key: 'studio', label: 'Post Production', icon: '🎛️', description: 'Edit, color, sound ও VFX' },
  { key: 'model', label: 'Makeup & Styling', icon: '✨', description: 'Makeup artist ও costume' },
  { key: 'artist', label: 'Production House', icon: '🏢', description: 'Creative team ও service' },
];

const divisions: Record<string, string[]> = {
  Dhaka: ['Dhaka', 'Gazipur', 'Narayanganj', 'Tangail'],
  Chattogram: ['Chattogram', "Cox's Bazar", 'Cumilla', 'Feni'],
  Rajshahi: ['Rajshahi', 'Bogura', 'Pabna', 'Natore'],
  Khulna: ['Khulna', 'Jashore', 'Kushtia', 'Satkhira'],
  Sylhet: ['Sylhet', 'Moulvibazar', 'Habiganj'],
  Rangpur: ['Rangpur', 'Dinajpur', 'Kurigram'],
  Barishal: ['Barishal', 'Patuakhali', 'Bhola'],
  Mymensingh: ['Mymensingh', 'Jamalpur', 'Netrakona'],
};

const listings: Listing[] = [
  { id: 1, category: 'camera', title: 'Sony FX3 Cinema Camera Package', subtitle: 'Body, 24-70 lens, monitor ও tripod', price: '৳ 8,000 / দিন', division: 'Dhaka', district: 'Dhaka', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80', badge: 'Camera Rental', rating: '4.9' },
  { id: 2, category: 'artist', title: 'Raisa Ahmed — অভিনেত্রী ও মডেল', subtitle: 'Commercial, music video ও fashion shoot', price: 'যোগাযোগ করুন', division: 'Dhaka', district: 'Dhaka', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80', badge: 'Featured Artist', rating: '5.0' },
  { id: 3, category: 'drone', title: 'DJI Inspire 3 Drone Service', subtitle: 'Licensed drone operator with FPV option', price: '৳ 12,000 / দিন', division: 'Chattogram', district: "Cox's Bazar", image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=900&q=80', badge: 'Drone Rental', rating: '4.8' },
  { id: 4, category: 'spot', title: 'Modern Daylight Studio', subtitle: 'Cyclorama, makeup room ও parking সুবিধা', price: '৳ 5,500 / দিন', division: 'Dhaka', district: 'Gazipur', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80', badge: 'Shooting Spot', rating: '4.9' },
  { id: 5, category: 'light', title: 'Aputure Light & Grip Package', subtitle: 'COB lights, softbox, C-stand ও generator', price: '৳ 6,500 / দিন', division: 'Rajshahi', district: 'Bogura', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80', badge: 'Light Setup', rating: '4.7' },
  { id: 6, category: 'director', title: 'Creative Director & Production Team', subtitle: 'TV commercial, documentary ও branded story', price: 'প্রজেক্ট অনুযায়ী', division: 'Sylhet', district: 'Sylhet', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80', badge: 'Production', rating: '5.0' },
  { id: 7, category: 'car', title: 'Shooting Van & Unit Transport', subtitle: 'Crew transport, equipment space ও AC', price: '৳ 7,000 / দিন', division: 'Khulna', district: 'Khulna', image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=900&q=80', badge: 'Transport', rating: '4.8' },
  { id: 8, category: 'studio', title: 'Color Grade & Sound Mixing Suite', subtitle: 'DaVinci Resolve suite and experienced editor', price: 'যোগাযোগ করুন', division: 'Dhaka', district: 'Narayanganj', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=80', badge: 'Post Production', rating: '4.9' },
];

const categoryLabels: Record<Category, string> = {
  all: 'সবগুলো', artist: 'আর্টিস্ট', director: 'ডিরেক্টর', model: 'মডেল', camera: 'ক্যামেরা', drone: 'ড্রোন', spot: 'শুটিং স্পট', light: 'লাইট', car: 'ট্রান্সপোর্ট', studio: 'স্টুডিও',
};

type MediaWorldLanguage = 'bn' | 'en';

const MEDIAWORLD_LANGUAGE_KEY = 'twingface-mediaworld-language';

const copy = {
  bn: {
    home: 'হোম',
    categories: 'ক্যাটাগরি',
    directory: 'সার্ভিস ডিরেক্টরি',
    about: 'আমাদের সম্পর্কে',
    postListing: '⊕ পোস্ট দিন',
    profile: 'আপনার প্রোফাইল',
    eyebrow: '⚡ বাংলাদেশের প্রথম অল-ইন-ওয়ান মিডিয়া সাপোর্ট প্ল্যাটফর্ম',
    heading: 'শুটিংয়ের সব সাপোর্ট',
    headingAccent: 'এক ছাদের নিচে — TwingFace Media World',
    introduction: 'আর্টিস্ট, ডিরেক্টর, ক্যামেরা, ড্রোন, শুটিং স্পট, লাইট বা ট্রান্সপোর্ট ভাড়া খুঁজছেন? বাংলাদেশের যেকোনো জেলা থেকে সঠিক মানুষ ও সার্ভিস খুঁজুন।',
    searchLabel: 'মিডিয়া ওয়ার্ল্ড খুঁজুন',
    searchPlaceholder: "কী খুঁজছেন? যেমন: Sony FX3, মডেল, স্পট Cox's Bazar, ড্রোন...",
    search: 'খুঁজুন',
    category: 'ক্যাটাগরি',
    division: 'বিভাগ (Division)',
    district: 'জেলা (District)',
    budget: 'সর্বোচ্চ বাজেট (দৈনিক)',
    explore: 'ক্যাটাগরি দেখুন',
    findService: 'আপনার প্রয়োজনীয় সার্ভিস খুঁজুন',
    serviceIntro: 'কাজের জন্য সঠিক টিম, ট্যালেন্ট ও ইকুইপমেন্ট এক জায়গায়।',
    featured: 'বিশেষ সার্ভিস',
    showing: 'দেখাচ্ছে',
    posts: 'টি পোস্ট',
    grow: 'আপনার মিডিয়া ব্যবসা বাড়ান',
    growHeading: 'আপনার সার্ভিসটি হাজারো মানুষের কাছে পৌঁছে দিন',
    growText: 'TwingFace Media World-এ নিজের সার্ভিস, ইকুইপমেন্ট বা শুটিং স্পট যুক্ত করুন।',
    freePost: 'ফ্রি পোস্ট দিন →',
  },
  en: {
    home: 'Home',
    categories: 'Categories',
    directory: 'Service directory',
    about: 'About us',
    postListing: '⊕ Post a listing',
    profile: 'Your profile',
    eyebrow: '⚡ Bangladesh’s all-in-one media support platform',
    heading: 'Every production need',
    headingAccent: 'under one roof — TwingFace Media World',
    introduction: 'Looking for artists, directors, cameras, drones, shooting spots, lighting, or transport? Find the right people and services from anywhere in Bangladesh.',
    searchLabel: 'Search Media World',
    searchPlaceholder: "What are you looking for? Sony FX3, a model, Cox's Bazar location, drone...",
    search: 'Search',
    category: 'Category',
    division: 'Division',
    district: 'District',
    budget: 'Maximum daily budget',
    explore: 'Explore categories',
    findService: 'Find the service you need',
    serviceIntro: 'The right team, talent, and equipment for your production in one place.',
    featured: 'Featured services',
    showing: 'Showing',
    posts: 'posts',
    grow: 'Grow your media business',
    growHeading: 'Bring your service to thousands of people',
    growText: 'Add your service, equipment, or shooting spot to TwingFace Media World.',
    freePost: 'Post for free →',
  },
} as const;

export default function MediaWorldLanding() {
  const [language, setLanguage] = useState<MediaWorldLanguage>('bn');
  const [menuOpen, setMenuOpen] = useState(false);
  const [listingOpen, setListingOpen] = useState(false);
  const [selected, setSelected] = useState<Listing | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('all');
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [notice, setNotice] = useState('');
  const text = copy[language];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(MEDIAWORLD_LANGUAGE_KEY);
    if (savedLanguage === 'bn' || savedLanguage === 'en') setLanguage(savedLanguage);
  }, []);

  function setPageLanguage(nextLanguage: MediaWorldLanguage) {
    setLanguage(nextLanguage);
    window.localStorage.setItem(MEDIAWORLD_LANGUAGE_KEY, nextLanguage);
  }

  const districtOptions = division ? divisions[division] ?? [] : [];
  const visibleListings = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return listings.filter((listing) => (
      (category === 'all' || listing.category === category)
      && (!division || listing.division === division)
      && (!district || listing.district === district)
      && (!normalized || `${listing.title} ${listing.subtitle} ${listing.district}`.toLowerCase().includes(normalized))
    ));
  }, [category, district, division, query]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    document.getElementById('mediaworld-listings')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function submitListing(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setListingOpen(false);
    setNotice('ধন্যবাদ! Listing submission interface প্রস্তুত আছে। Publishing-এর জন্য Media World backend approval প্রয়োজন।');
  }

  return (
    <main className='mediaworld-landing min-h-screen overflow-x-hidden bg-[#0f172a] text-slate-100' lang={language}>
      <section className='relative isolate overflow-hidden border-b border-slate-700/70 bg-slate-950'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(34,197,94,.18),transparent_38%),linear-gradient(rgba(15,23,42,.7),rgba(15,23,42,.96)),url(https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2000&q=85)] bg-cover bg-center' />
        <div className='relative max-w-7xl px-4 py-3 sm:px-6 lg:px-8' style={{ marginInline: 'auto' }}>
          <div className='flex min-h-16 items-center justify-between gap-3'>
            <a href='#mediaworld-hero' className='flex items-center gap-3 text-white no-underline'>
              <span className='grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-tr from-green-600 to-indigo-600 text-xl shadow-lg shadow-green-500/20'>🎬</span>
              <span className='leading-tight'>
                <span className='flex items-center gap-2 text-xl font-extrabold tracking-tight'>Twing<span className='text-green-400'>Face</span><small className='rounded-full border border-green-400/30 bg-green-400/15 px-2 py-0.5 text-[10px] text-green-300'>PRO</small></span>
                <span className='block text-[10px] font-semibold tracking-[.14em] text-slate-300'>MEDIA WORLD BANGLADESH</span>
              </span>
            </a>

            <nav className='hidden items-center gap-1 text-sm font-semibold text-slate-200 lg:flex' aria-label='Media World navigation'>
              <a className='rounded-lg px-4 py-2 hover:bg-slate-800/70 hover:text-white' href='#mediaworld-hero'>{text.home}</a>
              <a className='rounded-lg px-4 py-2 hover:bg-slate-800/70 hover:text-white' href='#mediaworld-categories'>{text.categories}</a>
              <a className='rounded-lg px-4 py-2 hover:bg-slate-800/70 hover:text-white' href='#mediaworld-listings'>{text.directory}</a>
              <a className='rounded-lg px-4 py-2 hover:bg-slate-800/70 hover:text-white' href='#mediaworld-about'>{text.about}</a>
            </nav>

            <div className='hidden items-center gap-3 sm:flex'>
              <div className='flex rounded-xl border border-slate-600 bg-slate-900/80 p-1 text-xs font-bold' aria-label='Media World language'>
                <button data-testid='mediaworld-language-bn' type='button' aria-pressed={language === 'bn'} onClick={() => setPageLanguage('bn')} className={`rounded-lg px-2.5 py-1.5 transition ${language === 'bn' ? 'bg-green-500 text-slate-950' : 'text-slate-300 hover:text-white'}`}>বাংলা</button>
                <button data-testid='mediaworld-language-en' type='button' aria-pressed={language === 'en'} onClick={() => setPageLanguage('en')} className={`rounded-lg px-2.5 py-1.5 transition ${language === 'en' ? 'bg-green-500 text-slate-950' : 'text-slate-300 hover:text-white'}`}>English</button>
              </div>
              <button type='button' onClick={() => setListingOpen(true)} className='rounded-xl border border-green-400/30 bg-slate-900/80 px-4 py-2.5 text-sm font-bold text-green-300 transition hover:bg-slate-800'>{text.postListing}</button>
              <Link href='/profile' className='rounded-xl bg-gradient-to-r from-green-600 to-green-500 px-5 py-2.5 text-sm font-bold text-white no-underline shadow-lg shadow-green-600/30 transition hover:from-green-500 hover:to-green-400'>{text.profile}</Link>
            </div>

            <div className='flex items-center gap-2 lg:hidden'>
              <button type='button' aria-label='Create Media World listing' onClick={() => setListingOpen(true)} className='rounded-xl border border-green-400/30 bg-green-400/15 p-2.5 text-green-300'>＋</button>
              <button type='button' aria-expanded={menuOpen} aria-controls='mediaworld-mobile-menu' onClick={() => setMenuOpen((open) => !open)} className='rounded-lg p-2 text-2xl text-slate-200 hover:bg-slate-800'>☰</button>
            </div>
          </div>
          {menuOpen ? (
            <nav id='mediaworld-mobile-menu' className='mediaworld-mobile-menu space-y-1 border-t border-slate-700/80 py-3 text-sm font-semibold text-slate-200 lg:hidden' aria-label='Media World mobile navigation'>
              <a className='block rounded-lg px-3 py-2.5 hover:bg-slate-800' onClick={() => setMenuOpen(false)} href='#mediaworld-hero'>{text.home}</a>
              <a className='block rounded-lg px-3 py-2.5 hover:bg-slate-800' onClick={() => setMenuOpen(false)} href='#mediaworld-categories'>{text.categories}</a>
              <a className='block rounded-lg px-3 py-2.5 hover:bg-slate-800' onClick={() => setMenuOpen(false)} href='#mediaworld-listings'>{text.directory}</a>
              <div className='flex gap-2 px-3 py-2' aria-label='Media World language'>
                <button type='button' aria-pressed={language === 'bn'} onClick={() => setPageLanguage('bn')} className={`flex-1 rounded-lg px-3 py-2 transition ${language === 'bn' ? 'bg-green-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>বাংলা</button>
                <button type='button' aria-pressed={language === 'en'} onClick={() => setPageLanguage('en')} className={`flex-1 rounded-lg px-3 py-2 transition ${language === 'en' ? 'bg-green-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>English</button>
              </div>
              <Link className='block rounded-lg bg-green-600 px-3 py-2.5 text-center text-white' href='/profile'>{text.profile}</Link>
            </nav>
          ) : null}
        </div>

        <div id='mediaworld-hero' className='mediaworld-hero relative flex w-full max-w-6xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:py-24' style={{ marginInline: 'auto' }}>
          <p className='mb-4 inline-flex items-center gap-2 rounded-full border border-slate-600/80 bg-slate-900/75 px-4 py-2 text-sm font-semibold text-green-300'>{text.eyebrow}</p>
          <h1 className='max-w-4xl text-3xl font-black leading-tight text-white sm:text-5xl lg:text-6xl'>{text.heading} <span className='block bg-gradient-to-r from-green-300 to-blue-400 bg-clip-text text-transparent'>{text.headingAccent}</span></h1>
          <p className='mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg'>{text.introduction}</p>

          <form onSubmit={submitSearch} className='mediaworld-search-panel mt-10 w-full rounded-2xl border border-slate-600/70 bg-slate-900/90 p-4 text-left shadow-2xl backdrop-blur sm:p-6'>
            <div className='relative'>
              <label className='sr-only' htmlFor='mediaworld-search'>{text.searchLabel}</label>
              <span className='pointer-events-none absolute inset-y-0 left-4 grid place-items-center text-slate-400'>⌕</span>
              <input id='mediaworld-search' value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text.searchPlaceholder} className='w-full rounded-xl border border-slate-700 bg-slate-800/90 py-3.5 pl-11 pr-28 text-base text-white outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20' />
              <button type='submit' className='absolute bottom-2 right-2 top-2 rounded-lg bg-green-600 px-5 text-sm font-bold text-white transition hover:bg-green-500'>{text.search}</button>
            </div>
            <div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
              <FilterLabel label={text.category}>
                <select value={category} onChange={(event) => setCategory(event.target.value as Category)} className='w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-green-500'>
                  {Object.entries(categoryLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                </select>
              </FilterLabel>
              <FilterLabel label={text.division}>
                <select value={division} onChange={(event) => { setDivision(event.target.value); setDistrict(''); }} className='w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-green-500'>
                  <option value=''>সব বিভাগ</option>
                  {Object.keys(divisions).map((item) => <option key={item}>{item}</option>)}
                </select>
              </FilterLabel>
              <FilterLabel label={text.district}>
                <select value={district} disabled={!division} onChange={(event) => setDistrict(event.target.value)} className='w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-green-500 disabled:cursor-not-allowed disabled:opacity-50'>
                  <option value=''>সব জেলা</option>
                  {districtOptions.map((item) => <option key={item}>{item}</option>)}
                </select>
              </FilterLabel>
              <FilterLabel label={text.budget}>
                <select className='w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-green-500' defaultValue=''>
                  <option value=''>যেকোনো বাজেট</option><option>৳ ৫,০০০ এর নিচে</option><option>৳ ১৫,০০০ এর নিচে</option><option>৳ ৩০,০০০ এর নিচে</option><option>৳ ৫০,০০০+</option>
                </select>
              </FilterLabel>
            </div>
            <div className='mt-4 flex flex-wrap gap-2'>{['ঢাকার স্টুডিও', 'কক্সবাজার শুটিং স্পট', 'ড্রোন সার্ভিস', 'মডেল খুঁজুন', 'ক্যামেরা ভাড়া'].map((tag) => <button type='button' key={tag} onClick={() => setQuery(tag)} className='rounded-full border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-green-400 hover:text-green-300'>#{tag}</button>)}</div>
          </form>
        </div>
      </section>

      <section id='mediaworld-categories' className='mediaworld-categories max-w-7xl px-4 py-16 sm:px-6 lg:px-8' style={{ marginInline: 'auto' }}>
        <header className='mb-8 text-center'><p className='text-sm font-bold uppercase tracking-[.18em] text-green-400'>{text.explore}</p><h2 className='mt-2 text-3xl font-extrabold text-white sm:text-4xl'>{text.findService}</h2><p className='mt-3 text-slate-400'>{text.serviceIntro}</p></header>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5'>
          {categories.map((item, index) => <button type='button' key={`${item.label}-${index}`} onClick={() => { setCategory(item.key); document.getElementById('mediaworld-listings')?.scrollIntoView({ behavior: 'smooth' }); }} className='rounded-2xl border border-white/10 bg-slate-800/70 p-4 text-left shadow-lg transition hover:-translate-y-1 hover:border-green-400/50 hover:bg-slate-800 sm:p-5'><span className='text-3xl'>{item.icon}</span><strong className='mt-4 block text-sm text-white sm:text-base'>{item.label}</strong><span className='mt-1 hidden text-xs leading-relaxed text-slate-400 sm:block'>{item.description}</span></button>)}
        </div>
      </section>

      <section id='mediaworld-listings' className='mediaworld-listings max-w-7xl px-4 pb-12 sm:px-6 lg:px-8' style={{ marginInline: 'auto' }}>
        <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'><div><p className='text-sm font-bold uppercase tracking-[.18em] text-green-400'>{text.directory}</p><h2 className='mt-1 text-3xl font-extrabold text-white'>{text.featured}</h2><p className='mt-1 text-sm text-slate-400'>{text.showing}: {visibleListings.length} {text.posts}</p></div><button type='button' onClick={() => setListingOpen(true)} className='rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-500'>{text.postListing}</button></div>
        <div className='mb-6 flex gap-2 overflow-x-auto pb-2'>{(Object.keys(categoryLabels) as Category[]).slice(0, 6).map((item) => <button key={item} type='button' onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition ${category === item ? 'bg-green-600 text-white shadow-md shadow-green-700/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>{categoryLabels[item]}</button>)}</div>
        {visibleListings.length ? <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>{visibleListings.map((listing) => <ListingCard key={listing.id} listing={listing} onOpen={() => setSelected(listing)} />)}</div> : <div className='rounded-2xl border border-slate-700 bg-slate-900/60 p-12 text-center'><p className='text-xl font-bold text-white'>কোনো ফলাফল পাওয়া যায়নি</p><p className='mt-2 text-slate-400'>Search বা filter পরিবর্তন করে আবার চেষ্টা করুন।</p></div>}
      </section>

      <section className='max-w-7xl px-4 py-8 sm:px-6 lg:px-8' style={{ marginInline: 'auto' }}><div className='relative overflow-hidden rounded-3xl border border-green-400/20 bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 px-6 py-10 shadow-xl sm:px-12'><div className='absolute -right-12 -top-16 h-64 w-64 rounded-full bg-white/10' /><div className='relative max-w-2xl'><p className='text-sm font-bold uppercase tracking-[.18em] text-green-100'>{text.grow}</p><h2 className='mt-2 text-3xl font-black text-white sm:text-4xl'>{text.growHeading}</h2><p className='mt-3 text-green-50'>{text.growText}</p><button type='button' onClick={() => setListingOpen(true)} className='mt-6 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-green-700 shadow-lg transition hover:bg-green-50'>{text.freePost}</button></div></div></section>

      <footer id='mediaworld-about' className='border-t border-slate-800 bg-slate-950 px-4 pb-10 pt-14 sm:px-6 lg:px-8'><div className='grid max-w-7xl gap-9 sm:grid-cols-2 lg:grid-cols-4' style={{ marginInline: 'auto' }}><div><h2 className='text-xl font-extrabold text-white'>Twing<span className='text-green-400'>Face</span> Media World</h2><p className='mt-3 text-sm leading-relaxed text-slate-400'>বাংলাদেশের media industry-র জন্য একসাথে talent, service ও shooting support directory।</p></div><FooterLinks title='Quick links' links={['হোম', 'ক্যাটাগরি', 'সার্ভিস ডিরেক্টরি', 'পোস্ট দিন']} /><FooterLinks title='জনপ্রিয় বিভাগ' links={['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'সিলেট']} /><FooterLinks title='Support' links={['Help center', 'Safety center', 'Terms & privacy', 'Contact us']} /></div><p className='mt-12 max-w-7xl border-t border-slate-800 pt-6 text-center text-xs text-slate-500' style={{ marginInline: 'auto' }}>© 2026 TwingFace Media World Bangladesh. সকল অধিকার সংরক্ষিত।</p></footer>

      {notice ? <div role='status' className='fixed bottom-5 right-5 z-50 max-w-sm rounded-xl border border-green-400/40 bg-slate-900 px-4 py-3 text-sm text-green-200 shadow-2xl'><button type='button' onClick={() => setNotice('')} className='float-right ml-3 text-lg leading-none text-slate-400'>×</button>{notice}</div> : null}
      {listingOpen ? <ListingModal onClose={() => setListingOpen(false)} onSubmit={submitListing} /> : null}
      {selected ? <DetailsModal listing={selected} onClose={() => setSelected(null)} /> : null}
    </main>
  );
}

function FilterLabel({ label, children }: { label: string; children: React.ReactNode }) { return <label className='block text-xs font-semibold text-slate-400'>{label}<span className='mt-1 block'>{children}</span></label>; }

function ListingCard({ listing, onOpen }: { listing: Listing; onOpen: () => void }) {
  return <article className='overflow-hidden rounded-2xl border border-white/10 bg-slate-800/70 shadow-lg transition hover:-translate-y-1 hover:border-green-400/40 hover:shadow-green-950/40'><div className='relative aspect-[4/3] overflow-hidden'><img alt={listing.title} className='h-full w-full object-cover transition duration-500 hover:scale-105' src={listing.image} /><span className='absolute left-3 top-3 rounded-full bg-slate-950/80 px-2.5 py-1 text-[10px] font-bold text-green-300 backdrop-blur'>{listing.badge}</span></div><div className='p-4'><h3 className='line-clamp-1 font-bold text-white'>{listing.title}</h3><p className='mt-1 line-clamp-2 min-h-10 text-sm text-slate-400'>{listing.subtitle}</p><p className='mt-3 text-lg font-extrabold text-green-400'>{listing.price}</p><p className='mt-2 flex items-center justify-between text-xs text-slate-400'><span>⌖ {listing.district}, {listing.division}</span><span>★ {listing.rating}</span></p><button type='button' onClick={onOpen} className='mt-4 w-full rounded-lg border border-green-400/30 bg-green-400/10 py-2.5 text-sm font-bold text-green-300 transition hover:bg-green-400/20'>বিস্তারিত দেখুন</button></div></article>;
}

function FooterLinks({ title, links }: { title: string; links: string[] }) { return <div><h3 className='font-bold text-white'>{title}</h3><ul className='mt-3 space-y-2 text-sm text-slate-400'>{links.map((link) => <li key={link}><a href='#mediaworld-hero' className='hover:text-green-300'>{link}</a></li>)}</ul></div>; }

function ListingModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  const fieldClass = 'w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-green-500';
  return <div className='mediaworld-listing-modal fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-sm' role='dialog' aria-modal='true' aria-label='Post a Media World listing'><form onSubmit={onSubmit} className='my-6 w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl sm:p-7'><div className='flex items-start justify-between gap-4'><div><p className='text-sm font-bold uppercase tracking-[.16em] text-green-400'>TwingFace Media World</p><h2 className='mt-1 text-2xl font-extrabold text-white'>নতুন পোস্ট দিন</h2></div><button type='button' onClick={onClose} aria-label='Close listing form' className='rounded-lg p-2 text-xl text-slate-400 hover:bg-slate-800'>×</button></div><div className='mt-6 grid gap-4 sm:grid-cols-2'><FormField label='আপনার নাম'><input required placeholder='নাম লিখুন' className={fieldClass} /></FormField><FormField label='ক্যাটাগরি'><select required className={fieldClass}><option value=''>সিলেক্ট করুন</option>{Object.entries(categoryLabels).slice(1).map(([key, value]) => <option key={key}>{value}</option>)}</select></FormField><FormField label='বিভাগ'><select required className={fieldClass}><option>Dhaka</option>{Object.keys(divisions).filter((item) => item !== 'Dhaka').map((item) => <option key={item}>{item}</option>)}</select></FormField><FormField label='জেলা'><input required placeholder='জেলা লিখুন' className={fieldClass} /></FormField></div><FormField label='আপনার সার্ভিস বা ইকুইপমেন্টের তথ্য'><textarea required rows={4} placeholder='সংক্ষেপে বিস্তারিত লিখুন...' className={`${fieldClass} mt-1 resize-y`} /></FormField><div className='mt-6 flex justify-end gap-3'><button type='button' onClick={onClose} className='rounded-xl px-4 py-2.5 text-sm font-bold text-slate-300 hover:bg-slate-800'>বাতিল</button><button type='submit' className='rounded-xl bg-green-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-green-500'>সাবমিট করুন</button></div></form></div>;
}

function DetailsModal({ listing, onClose }: { listing: Listing; onClose: () => void }) { return <div className='mediaworld-details-modal fixed inset-0 z-[70] grid place-items-center bg-slate-950/80 p-4 backdrop-blur-sm' role='dialog' aria-modal='true' aria-label={`${listing.title} details`}><div className='w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl sm:grid sm:grid-cols-2'><img src={listing.image} alt={listing.title} className='h-56 w-full object-cover sm:h-full' /><div className='p-6'><button type='button' onClick={onClose} aria-label='Close listing details' className='float-right text-xl text-slate-400'>×</button><span className='text-xs font-bold text-green-400'>{listing.badge}</span><h2 className='mt-2 text-2xl font-extrabold text-white'>{listing.title}</h2><p className='mt-3 text-sm leading-relaxed text-slate-300'>{listing.subtitle}</p><p className='mt-4 text-xl font-extrabold text-green-400'>{listing.price}</p><p className='mt-2 text-sm text-slate-400'>⌖ {listing.district}, {listing.division} · ★ {listing.rating}</p><button type='button' onClick={() => window.alert('Is this available?')} className='mt-6 w-full rounded-xl bg-green-600 py-3 text-sm font-bold text-white hover:bg-green-500'>Is this available?</button></div></div></div>; }

function FormField({ label, children }: { label: string; children: React.ReactNode }) { return <label className='mt-4 block text-sm font-semibold text-slate-300'>{label}<span className='mt-1.5 block'>{children}</span></label>; }

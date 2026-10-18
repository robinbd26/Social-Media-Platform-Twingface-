'use client';

import { useMemo, useState } from 'react';

type OttItem = {
  title: string;
  image: string;
  kind: 'premium' | 'free' | 'show';
  meta: string;
  genre: string;
};

const navigation = ['Home', 'Premium', 'Free Movies', 'TV Shows', 'My List', 'Watch Later', 'History'];
const genres = ['Action', 'Drama', 'Comedy', 'Thriller', 'Horror', 'Romance', 'Sci-Fi', 'Documentary', 'Animation'];

const content: OttItem[] = [
  { title: 'The Last Mission', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=700&q=80', kind: 'premium', meta: '2026 · 2h 08m', genre: 'Action' },
  { title: 'Midnight Signal', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7451?auto=format&fit=crop&w=700&q=80', kind: 'premium', meta: '2025 · 1h 54m', genre: 'Thriller' },
  { title: 'Before the Rain', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=80', kind: 'premium', meta: '2026 · 1h 48m', genre: 'Drama' },
  { title: 'Paper Skies', image: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=700&q=80', kind: 'premium', meta: '2025 · 2h 01m', genre: 'Romance' },
  { title: 'Shadows', image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=700&q=80', kind: 'premium', meta: '2026 · 1h 52m', genre: 'Thriller' },
  { title: 'Hearts Apart', image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=700&q=80', kind: 'premium', meta: '2025 · 1h 46m', genre: 'Romance' },
  { title: 'The Reckoning', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80', kind: 'premium', meta: '2026 · 2h 14m', genre: 'Action' },
  { title: 'City of Dreams', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=700&q=80', kind: 'premium', meta: '2025 · 1h 58m', genre: 'Drama' },
  { title: 'The Long Road', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=700&q=80', kind: 'free', meta: '2024 · 1h 39m', genre: 'Documentary' },
  { title: 'City of Tomorrow', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7451?auto=format&fit=crop&w=700&q=80', kind: 'free', meta: '2025 · 1h 46m', genre: 'Sci-Fi' },
  { title: 'Weekend Escape', image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=700&q=80', kind: 'free', meta: '2024 · 1h 32m', genre: 'Comedy' },
  { title: 'Wild Hearts', image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=700&q=80', kind: 'free', meta: '2025 · 1h 51m', genre: 'Drama' },
  { title: 'The Village', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80', kind: 'free', meta: '2024 · 1h 44m', genre: 'Drama' },
  { title: 'Brotherhood', image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=700&q=80', kind: 'free', meta: '2025 · 1h 37m', genre: 'Drama' },
  { title: 'Last Train', image: 'https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=700&q=80', kind: 'free', meta: '2024 · 1h 42m', genre: 'Thriller' },
  { title: 'Blue Sky', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80', kind: 'free', meta: '2025 · 1h 36m', genre: 'Romance' },
  { title: 'Shadow Code', image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=700&q=80', kind: 'show', meta: 'S1 · E8', genre: 'Thriller' },
  { title: 'Dhaka Files', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=700&q=80', kind: 'show', meta: 'S2 · E10', genre: 'Documentary' },
  { title: 'Orbit Nine', image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=700&q=80', kind: 'show', meta: 'S1 · E6', genre: 'Sci-Fi' },
  { title: 'After Dark', image: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&w=700&q=80', kind: 'show', meta: 'S3 · E4', genre: 'Horror' },
  { title: 'The Office', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=700&q=80', kind: 'show', meta: 'S1 · E8', genre: 'Comedy' },
  { title: 'Family Bonds', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=700&q=80', kind: 'show', meta: 'S1 · E6', genre: 'Drama' },
  { title: 'College Days', image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=700&q=80', kind: 'show', meta: 'S1 · E5', genre: 'Comedy' },
  { title: 'The Investigator', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=80', kind: 'show', meta: 'S1 · E7', genre: 'Thriller' },
];

function PosterCard({ item }: { item: OttItem }) {
  const badge = item.kind === 'premium' ? '👑 Premium' : item.kind === 'free' ? '▶ Free' : item.meta;
  return (
    <button type='button' className='ott-poster-card' aria-label={`Open ${item.title}`}>
      <img src={item.image} alt='' />
      <span className={`ott-poster-badge ${item.kind}`}>{badge}</span>
      {item.kind !== 'show' ? <span className='ott-hd-badge'>HD</span> : null}
      <span className='ott-poster-gradient' />
      <span className='ott-poster-copy'><strong>{item.title}</strong><small>{item.kind === 'show' ? item.meta : `${item.meta} · ${item.genre}`}</small></span>
    </button>
  );
}

function Rail({ title, items, kind }: { title: string; items: OttItem[]; kind: OttItem['kind'] }) {
  const label = kind === 'premium' ? 'Only on Twingface' : kind === 'free' ? 'Watch Now, No Cost' : null;
  return (
    <section className='ott-rail' aria-label={title}>
      <div className='ott-section-head'>
        <div>
          <h2>{kind === 'premium' ? '👑 ' : kind === 'free' ? '▶ ' : '▣ '}{title}</h2>
          {label ? <span>{label}</span> : null}
        </div>
        <button type='button'>View All&nbsp; →</button>
      </div>
      <div className='ott-poster-grid ott-rail-scroll'>{items.map((item) => <PosterCard key={item.title} item={item} />)}</div>
    </section>
  );
}

export default function OttPlatform() {
  const [activeNav, setActiveNav] = useState('Home');
  const [activeGenre, setActiveGenre] = useState('All');
  const [watching, setWatching] = useState(false);
  const rows = useMemo(() => ({
    premium: content.filter((item) => item.kind === 'premium' && (activeGenre === 'All' || item.genre === activeGenre)),
    free: content.filter((item) => item.kind === 'free' && (activeGenre === 'All' || item.genre === activeGenre)),
    shows: content.filter((item) => item.kind === 'show' && (activeGenre === 'All' || item.genre === activeGenre)),
  }), [activeGenre]);

  return (
    <section className='ott-platform-layout' aria-label='Twingface OTT platform'>
      <aside className='ott-sidebar'>
        <div className='ott-sidebar-title'><span>◉</span><div><strong>TwingFace OTT</strong><small>Stream your stories</small></div></div>
        <nav className='ott-navigation' aria-label='OTT navigation'>
          {navigation.map((item) => <button key={item} type='button' className={activeNav === item ? 'active' : ''} onClick={() => setActiveNav(item)}><span>{item === 'Home' ? '⌂' : item === 'Premium' ? '♛' : item === 'TV Shows' ? '▣' : '▹'}</span>{item}</button>)}
        </nav>
        <div className='ott-sidebar-divider' />
        <details className='ott-genre-menu' open><summary>Genres <span>⌄</span></summary><div>{['All', ...genres].map((genre) => <button key={genre} type='button' className={activeGenre === genre ? 'active' : ''} onClick={() => setActiveGenre(genre)}>{genre}</button>)}</div></details>
        <div className='ott-premium-promo'><span>✦ PREMIUM</span><strong>More stories.<br />No limits.</strong><p>Unlock every title in 4K.</p><button type='button'>Upgrade Now <b>→</b></button></div>
      </aside>

      <main className='ott-main ott-main-cinematic'>
        <section className='ott-hero'>
          <img src='https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=85' alt='' />
          <div className='ott-hero-shade' />
          <div className='ott-hero-copy'>
            <p className='ott-eyebrow'>TwingFace Originals</p>
            <h1>THE LAST<br /><i>MISSION</i></h1>
            <div className='ott-hero-meta'><span>2026</span><span>16+</span><span>2h 08m</span><span>Action · Thriller</span></div>
            <p>A former intelligence officer has one last night to uncover the truth before it disappears forever.</p>
            <div className='ott-hero-actions'><button type='button' className='ott-watch-button' onClick={() => setWatching(true)}>▶ Watch Now</button><button type='button' className='ott-info-button'>ⓘ More Info</button></div>
            {watching ? <div className='ott-watch-note' role='status'>Preview playback is ready.</div> : null}
          </div>
          <div className='ott-hero-carousel-dots' aria-label='Featured slides'><span className='active' /><span /><span /><span /></div>
        </section>
        <Rail title='Featured on Premium' items={rows.premium} kind='premium' />
        <Rail title='Free Movies' items={rows.free} kind='free' />
        <Rail title='TV Shows' items={rows.shows} kind='show' />
      </main>
    </section>
  );
}

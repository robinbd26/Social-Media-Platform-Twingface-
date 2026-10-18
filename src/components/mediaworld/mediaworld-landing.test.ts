import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const source = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');

describe('Media World landing page contract', () => {
  it('renders the Media World platform in the standard app shell', () => {
    const page = source('src/app/(main)/mediaworld/page.tsx');
    const componentPath = 'src/components/mediaworld/mediaworld-platform.tsx';

    expect(page).toContain("import MediaWorldPlatform from '@/components/mediaworld/mediaworld-platform'");
    expect(page).toContain("<main className='mediaworld-page'>");
    expect(page).toContain('<MediaWorldPlatform');
    expect(existsSync(resolve(process.cwd(), componentPath))).toBe(true);

    if (!existsSync(resolve(process.cwd(), componentPath))) return;

    const platform = source(componentPath);
    expect(platform).toContain('mediaworld-sidebar');
    expect(platform).toContain('mediaworld-main-cinematic');
    expect(platform).toContain('mediaworld-hero-background');
    expect(platform).toContain('mediaworld-search-row');
  });

  it('offers a persisted Bangla and English interface switcher', () => {
    const landing = source('src/components/mediaworld/mediaworld-landing.tsx');

    expect(landing).toContain("data-testid='mediaworld-language-bn'");
    expect(landing).toContain("data-testid='mediaworld-language-en'");
    expect(landing).toContain("aria-pressed={language === 'bn'}");
    expect(landing).toContain("aria-pressed={language === 'en'}");
    expect(landing).toContain("localStorage.getItem(MEDIAWORLD_LANGUAGE_KEY)");
    expect(landing).toContain("localStorage.setItem(MEDIAWORLD_LANGUAGE_KEY, nextLanguage)");
  });
});

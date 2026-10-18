import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const source = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');

describe('OTT platform UI contract', () => {
  it('provides the responsive cinema browse experience instead of a coming-soon screen', () => {
    const componentPath = 'src/components/ott/ott-platform.tsx';

    expect(existsSync(resolve(process.cwd(), componentPath))).toBe(true);

    const ott = source(componentPath);
    expect(ott).toContain('ott-platform-layout');
    expect(ott).toContain('THE LAST');
    expect(ott).toContain('MISSION');
    expect(ott).toContain('Featured on Premium');
    expect(ott).toContain('Free Movies');
    expect(ott).toContain('TV Shows');
    expect(ott).toContain('Upgrade Now');
    expect(ott).toContain('Watch Now');
  });

  it('uses the supplied compact cinematic hero and poster rails in the right pane', () => {
    const ott = source('src/components/ott/ott-platform.tsx');

    expect(ott).toContain("className='ott-main ott-main-cinematic'");
    expect(ott).toContain("className='ott-hero-carousel-dots'");
    expect(ott).toContain('Only on Twingface');
    expect(ott).toContain('ott-rail-scroll');
  });
});

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const platform = () =>
  readFileSync(resolve(process.cwd(), 'src/components/mediaworld/mediaworld-platform.tsx'), 'utf8');

describe('MediaWorld platform shell', () => {
  it('keeps the TwingFace sidebar while placing the cinematic discovery hero in the right pane', () => {
    const source = platform();

    expect(source).toContain("<aside className='mediaworld-sidebar'>");
    expect(source).toContain("<main className='mediaworld-main mediaworld-main-cinematic'>");
    expect(source).toContain("className='mediaworld-hero-background'");
    expect(source).toContain("className='mediaworld-hero-content'");
  });

  it('places the reference service category grid directly beneath the hero', () => {
    const source = platform();

    expect(source).toContain("className='mediaworld-service-categories'");
    expect(source).toContain("className='mediaworld-category-grid'");
    expect(source).toContain('Choose the media category you need.');
    expect(source).toContain('See all services');
  });

  it('adds the available services booking grid beneath the category section', () => {
    const source = platform();

    expect(source).toContain("className='mediaworld-available-services'");
    expect(source).toContain("className='mediaworld-available-grid'");
    expect(source).toContain('List of available services and fares');
    expect(source).toContain('Details / Booking');
  });

  it('adds a compact directory footer below the existing MediaWorld content', () => {
    const source = platform();

    expect(source).toContain("className='mediaworld-directory-footer'");
    expect(source).toContain('TwingFace Media World');
    expect(source).toContain('Contact and Help');
    expect(source).toContain('Privacy Policy');
  });
});

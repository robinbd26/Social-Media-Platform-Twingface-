import { describe, expect, it } from 'vitest';
import { SearchMediaWorldInputSchema } from './mediaworld-validations';
import { districtOptionsForDivision, filterListings, groupByDivision } from './mediaworld';

describe('mediaworld validations', () => {
  it('accepts an empty search', () => {
    expect(SearchMediaWorldInputSchema.safeParse({}).success).toBe(true);
  });

  it('accepts Rajshahi -> Bogura (district inside its division)', () => {
    const parsed = SearchMediaWorldInputSchema.safeParse({ division: 'Rajshahi', district: 'Bogura' });
    expect(parsed.success).toBe(true);
  });

  it('accepts the new media categories', () => {
    for (const category of ['STORY_WRITER', 'DIRECTOR', 'ARTIST', 'PRODUCER', 'DOP', 'CAMERA_HOUSE', 'SHOOTING_HOUSE', 'MAKEUP_MAN', 'PRODUCTION', 'SHOOTING_BUS_CAR', 'LIGHT_HOUSE']) {
      expect(SearchMediaWorldInputSchema.safeParse({ category }).success).toBe(true);
    }
  });

  it('rejects Bogura under Dhaka division', () => {
    const parsed = SearchMediaWorldInputSchema.safeParse({ division: 'Dhaka', district: 'Bogura' });
    expect(parsed.success).toBe(false);
  });

  it('rejects an unknown district', () => {
    const parsed = SearchMediaWorldInputSchema.safeParse({ district: 'Atlantis' });
    expect(parsed.success).toBe(false);
  });
});

describe('mediaworld directory helpers', () => {
  it('exposes Bogura under Rajshahi', () => {
    expect(districtOptionsForDivision('Rajshahi')).toContain('Bogura');
    expect(districtOptionsForDivision('Unknown')).toEqual([]);
  });

  it('filters listings by query, category and location', () => {
    const rows = [
      { id: 'a', title: 'Wedding camera', description: 'Cinema camera', pricePaisa: 100, category: 'ELECTRONICS', condition: 'USED', status: 'AVAILABLE', location: 'Bogura, Rajshahi', images: [], sellerId: 's', createdAt: new Date(), updatedAt: new Date() },
      { id: 'b', title: 'Sofa set', description: 'Furniture', pricePaisa: 100, category: 'FURNITURE', condition: 'NEW', status: 'AVAILABLE', location: 'Dhaka', images: [], sellerId: 's', createdAt: new Date(), updatedAt: new Date() },
    ] as never as Parameters<typeof filterListings>[0];
    expect(filterListings(rows, 'camera', '', '', '').map((row) => row.id)).toEqual(['a']);
    expect(filterListings(rows, '', 'FURNITURE', '', '').map((row) => row.id)).toEqual(['b']);
    expect(filterListings(rows, '', '', '', 'Bogura, Rajshahi').map((row) => row.id)).toEqual(['a']);
    expect(filterListings(rows, '', '', '', 'Dhaka').map((row) => row.id)).toEqual(['b']);
  });

  it('groups listings by location', () => {
    const rows = [
      { id: 'a', title: 'A', description: 'A', pricePaisa: 1, category: 'OTHER', condition: 'NEW', status: 'AVAILABLE', location: 'Bogura', images: [], sellerId: 's', createdAt: new Date(), updatedAt: new Date() },
    ] as never as Parameters<typeof groupByDivision>[0];
    expect(groupByDivision(rows)).toEqual([{ division: 'Bogura', items: rows }]);
  });
});

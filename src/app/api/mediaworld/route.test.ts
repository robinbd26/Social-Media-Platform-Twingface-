import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  getCurrentUser: vi.fn(),
  findMany: vi.fn(),
}));

vi.mock('@/lib/auth', () => ({ getCurrentUser: mocks.getCurrentUser }));
vi.mock('@/lib/db', () => ({ prisma: { marketplaceListing: { findMany: mocks.findMany } } }));

import { GET } from './route';

const viewer = { id: 'user-a', name: 'A', username: 'alice', email: 'alice@example.com', profileImage: null };

describe('mediaworld directory API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getCurrentUser.mockResolvedValue(viewer);
    mocks.findMany.mockResolvedValue([]);
  });

  it('requires authentication', async () => {
    mocks.getCurrentUser.mockResolvedValue(null);
    expect((await GET(new Request('http://localhost/api/mediaworld'))).status).toBe(401);
    expect(mocks.findMany).not.toHaveBeenCalled();
  });

  it('searches available listings with bounded safe filters', async () => {
    const response = await GET(new Request('http://localhost/api/mediaworld?limit=99&q=%20camera%20&category=ELECTRONICS'));
    expect(response.status).toBe(200);
    expect(mocks.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ status: 'AVAILABLE', category: 'ELECTRONICS' }),
      }),
    );
    expect(JSON.stringify(await response.json())).not.toMatch(/email|phone|passwordHash|publicId/i);
  });

  it('rejects a district that does not belong to the division (Rajshahi -> Bogura is fine)', async () => {
    const ok = await GET(new Request('http://localhost/api/mediaworld?division=Rajshahi&district=Bogura'));
    expect(ok.status).toBe(200);
    const bad = await GET(new Request('http://localhost/api/mediaworld?division=Dhaka&district=Bogura'));
    expect(bad.status).toBe(400);
    expect(mocks.findMany).toHaveBeenCalledTimes(1);
  });
});

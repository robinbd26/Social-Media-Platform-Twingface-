import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  createSession: vi.fn(),
  findUnique: vi.fn(),
  setSessionCookie: vi.fn(),
  verifyPassword: vi.fn(),
}));

vi.mock('@/lib/auth', () => ({
  createSession: mocks.createSession,
  setSessionCookie: mocks.setSessionCookie,
  verifyPassword: mocks.verifyPassword,
}));

vi.mock('@/lib/db', () => ({ prisma: { user: { findUnique: mocks.findUnique } } }));

import { POST } from './route';

const user = {
  id: 'user-1',
  name: 'Farah Rahman',
  username: 'farah.rahman',
  email: 'farah@example.com',
  passwordHash: 'stored-hash',
};

function request(body: unknown) {
  return new Request('http://localhost/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/auth/login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.findUnique.mockResolvedValue(user);
    mocks.verifyPassword.mockResolvedValue(true);
    mocks.createSession.mockResolvedValue({ token: 'session-token', expiresAt: new Date('2026-10-15T00:00:00.000Z') });
  });

  it.each([
    ['User ID', ' Farah.Rahman ', { username: 'farah.rahman' }],
    ['email', ' FARAH@EXAMPLE.COM ', { email: 'farah@example.com' }],
    ['Bangladesh phone', '01712 345678', { phone: '+8801712345678' }],
  ])('signs in by %s with one targeted lookup', async (_label, identifier, where) => {
    const response = await POST(request({ identifier, password: 'StrongPass123' }));

    expect(response.status).toBe(200);
    expect(mocks.findUnique).toHaveBeenCalledTimes(1);
    expect(mocks.findUnique).toHaveBeenCalledWith(expect.objectContaining({ where }));
    expect(await response.json()).toEqual({ user: { id: user.id, name: user.name, username: user.username, email: user.email } });
  });

  it('accepts the legacy email request body during migration', async () => {
    const response = await POST(request({ email: ' FARAH@EXAMPLE.COM ', password: 'StrongPass123' }));

    expect(response.status).toBe(200);
    expect(mocks.findUnique).toHaveBeenCalledWith(expect.objectContaining({ where: { email: 'farah@example.com' } }));
  });

  it('returns the same generic response for unknown accounts and malformed identifiers', async () => {
    mocks.findUnique.mockResolvedValueOnce(null);
    const unknown = await POST(request({ identifier: 'unknown.user', password: 'StrongPass123' }));
    const malformed = await POST(request({ identifier: 'bad user', password: 'StrongPass123' }));

    expect(unknown.status).toBe(401);
    expect(malformed.status).toBe(401);
    expect(await unknown.json()).toEqual(await malformed.json());
    expect(mocks.findUnique).toHaveBeenCalledTimes(1);
  });

  it('returns the generic response when password verification fails', async () => {
    mocks.verifyPassword.mockResolvedValue(false);

    const response = await POST(request({ identifier: 'farah.rahman', password: 'WrongPass123' }));

    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ error: 'Invalid email or password.' });
    expect(mocks.createSession).not.toHaveBeenCalled();
  });
});

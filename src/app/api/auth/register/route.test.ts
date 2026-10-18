import { Prisma } from '@prisma/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  create: vi.fn(),
  findUnique: vi.fn(),
  createSession: vi.fn(),
  hashPassword: vi.fn(),
  setSessionCookie: vi.fn(),
}));

vi.mock('@/lib/auth', () => ({
  createSession: mocks.createSession,
  hashPassword: mocks.hashPassword,
  setSessionCookie: mocks.setSessionCookie,
}));

vi.mock('@/lib/db', () => ({ prisma: { user: { create: mocks.create, findUnique: mocks.findUnique } } }));

import { POST } from './route';

const body = {
  name: 'Farah Rahman',
  username: ' Farah.Rahman ',
  contact: 'farah@example.com',
  password: 'StrongPass123',
  confirmPassword: 'StrongPass123',
};

function request(value = body) {
  return new Request('http://localhost/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(value),
  });
}

describe('POST /api/auth/register', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.hashPassword.mockResolvedValue('hashed-password');
    mocks.create.mockResolvedValue({
      id: 'user-1',
      name: 'Farah Rahman',
      username: 'farah.rahman',
      email: 'farah@example.com',
      phone: null,
      gender: null,
      dateOfBirth: null,
      division: null,
      district: null,
    });
    mocks.createSession.mockResolvedValue({ token: 'session-token', expiresAt: new Date('2026-10-15T00:00:00.000Z') });
  });

  it('persists a normalized suggested User ID', async () => {
    const response = await POST(request());

    expect(response.status).toBe(201);
    expect(mocks.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ username: 'farah.rahman' }),
    }));
  });

  it('retries with a fresh generated User ID after a collision', async () => {
    mocks.findUnique.mockResolvedValueOnce({ id: 'existing-user' }).mockResolvedValueOnce(null);
    mocks.create.mockResolvedValueOnce({
      id: 'user-2', name: 'Farah Rahman', username: 'farah.rahman-123abc', email: 'farah@example.com', phone: null, gender: null, dateOfBirth: null, division: null, district: null,
    });
    const response = await POST(request({ ...body, username: 'farah.rahman-123abc' }));

    expect(response.status).toBe(201);
    expect(mocks.findUnique).toHaveBeenCalled();
  });

  it('returns a safe field error when the User ID is already in use', async () => {
    mocks.create.mockRejectedValue(new Prisma.PrismaClientKnownRequestError('duplicate', {
      code: 'P2002',
      clientVersion: '6.19.3',
      meta: { target: ['username'] },
    }));

    const response = await POST(request());

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({
      error: 'Unable to create a unique User ID. Please try again.',
      fields: { username: ['Unable to create a unique User ID. Please try again.'] },
    });
  });
});

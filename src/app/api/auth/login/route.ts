import { NextResponse } from 'next/server';
import { createSession, setSessionCookie, verifyPassword } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { loginSchema } from '@/lib/validations';

const INVALID_CREDENTIALS = 'Invalid email or password.';

export async function POST(req: Request) {
  const body: unknown = await req.json().catch(() => null);
  const candidate = body && typeof body === 'object' && !Array.isArray(body)
    ? {
        ...(body as Record<string, unknown>),
        identifier: 'identifier' in body && (body as Record<string, unknown>).identifier !== undefined
          ? (body as Record<string, unknown>).identifier
          : (body as Record<string, unknown>).email,
      }
    : body;
  const parsed = loginSchema.safeParse(candidate);
  if (!parsed.success) return NextResponse.json({ error: INVALID_CREDENTIALS }, { status: 401 });
  const { identifier, password } = parsed.data;
  const where = identifier.kind === 'email'
    ? { email: identifier.value }
    : identifier.kind === 'phone'
      ? { phone: identifier.value }
      : { username: identifier.value };
  const user = await prisma.user.findUnique({ where, select: { id: true, name: true, username: true, email: true, passwordHash: true } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) return NextResponse.json({ error: INVALID_CREDENTIALS }, { status: 401 });
  const session = await createSession(user.id);
  await setSessionCookie(session.token, session.expiresAt);
  return NextResponse.json({ user: { id: user.id, name: user.name, username: user.username, email: user.email } });
}

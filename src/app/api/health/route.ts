import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  let db: { connected: boolean; latencyMs?: number; error?: string } = { connected: false };

  try {
    const start = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    db = { connected: true, latencyMs: Date.now() - start };
  } catch (e) {
    db = { connected: false, error: e instanceof Error ? e.message : 'DB connection failed' };
  }

  return NextResponse.json({
    status: db.connected ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    db,
  });
}

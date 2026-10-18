import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { MAX_MARKETPLACE_LIMIT } from '@/lib/marketplace';
import { safeMediaWorldListingSelect } from '@/lib/mediaworld';
import { SearchMediaWorldInputSchema } from '@/lib/mediaworld-validations';

export const runtime = 'nodejs';

// Public-ish directory search over AVAILABLE marketplace listings.
// Auth is required (same rule as /api/marketplace) so seller contact
// details never leak to anonymous visitors.
export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Authentication is required.' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const input = SearchMediaWorldInputSchema.safeParse({
      query: searchParams.get('q') ?? searchParams.get('query') ?? undefined,
      division: searchParams.get('division') ?? undefined,
      district: searchParams.get('district') ?? undefined,
      category: searchParams.get('category') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      cursor: searchParams.get('cursor') ?? undefined,
    });

    if (!input.success) {
      return NextResponse.json(
        { error: 'Please correct the highlighted fields.', fields: input.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { query = '', division = '', district = '', category, limit, cursor } = input.data;
    const take = limit ?? MAX_MARKETPLACE_LIMIT;

    const listings = await prisma.marketplaceListing.findMany({
      where: {
        status: 'AVAILABLE',
        ...(category ? { category } : {}),
        // Listings store a single free-text location. Division/district
        // filters match against it case-insensitively.
        ...(division ? { location: { contains: division, mode: 'insensitive' } } : {}),
        ...(district ? { location: { contains: district, mode: 'insensitive' } } : {}),
        ...(query
          ? {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { location: { contains: query, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      take: take + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      select: safeMediaWorldListingSelect,
    });

    const hasMore = listings.length > take;
    const page = hasMore ? listings.slice(0, take) : listings;
    return NextResponse.json({ listings: page, nextCursor: hasMore ? page.at(-1)?.id ?? null : null });
  } catch (error) {
    console.error('[mediaworld GET] error:', error);
    return NextResponse.json({ error: 'Unable to load Media World listings.' }, { status: 500 });
  }
}

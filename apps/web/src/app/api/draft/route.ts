import { createHash, timingSafeEqual } from 'node:crypto';
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Draft preview entry: /api/draft?secret=<SANITY_PREVIEW_SECRET>&slug=<slug>.
 * Sets Next's draft mode cookie and opens the case study, which then reads
 * through the drafts perspective (see projects.draftBySlug). Only the browser
 * holding the cookie bypasses the cache; everyone else keeps the ISR page.
 */

const SLUG_PATTERN = /^[a-z0-9-]+$/;

// Hashing both sides first gives timingSafeEqual equal-length inputs, so the
// comparison leaks neither content nor length.
const secretsMatch = (given: string, expected: string) =>
  timingSafeEqual(
    createHash('sha256').update(given).digest(),
    createHash('sha256').update(expected).digest()
  );

export async function GET(request: NextRequest) {
  const expected = process.env.SANITY_PREVIEW_SECRET;
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  if (!expected || !secret || !secretsMatch(secret, expected)) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  // The slug becomes the redirect path, so only a bare project slug is
  // accepted: no slashes, no protocol, no open redirect.
  if (!slug || !SLUG_PATTERN.test(slug)) {
    return NextResponse.json({ message: 'Invalid slug' }, { status: 400 });
  }

  (await draftMode()).enable();
  redirect(`/projects/${slug}`);
}

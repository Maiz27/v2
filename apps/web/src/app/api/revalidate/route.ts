import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

/**
 * Sanity webhook target. Content edits push here instead of the site relying
 * on a blanket ISR interval, so published changes go live within seconds
 * instead of waiting out a TTL. The four pages/route that read from Sanity
 * still carry a long `revalidate` fallback for the rare case a webhook is
 * missed (see their files).
 *
 * Expected GROQ projection: `{ _type, "slug": slug.current }` — configure the
 * Sanity webhook to fire on create/update/delete for project, aboutMe, cv,
 * metadata, tool, experience, kind.
 */

// projects/[slug] is a dynamic route — revalidatePath needs the route
// pattern (not a literal path) plus its type to invalidate every rendered
// slug at once.
const PROJECT_DYNAMIC_ROUTE = '/projects/[slug]';

type WebhookPayload = {
  _type?: string;
  slug?: string;
};

const pathsFor = ({ _type, slug }: WebhookPayload): string[] => {
  switch (_type) {
    case 'project': {
      const paths = ['/', '/projects', '/sitemap.xml'];
      if (slug) paths.unshift(`/projects/${slug}`);
      return paths;
    }
    case 'aboutMe':
      return ['/'];
    case 'cv':
      return ['/cv'];
    case 'metadata':
      // The metadata document's slug IS the route path it describes (e.g.
      // '/', '/projects', '/cv') — anything else isn't a real path to revalidate.
      return slug && slug.startsWith('/') ? [slug] : [];
    default:
      // tool, experience, kind, and anything unrecognized are referenced
      // across many pages via references rather than a single route, so
      // revalidate broadly instead of trying to trace every consumer.
      return ['/', '/projects', '/cv', '/sitemap.xml', PROJECT_DYNAMIC_ROUTE];
  }
};

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: 'SANITY_REVALIDATE_SECRET is not configured' },
      { status: 500 }
    );
  }

  // The signature is computed over the exact raw body bytes Sanity sent, so
  // it must be read as text (and validated) before any JSON parsing.
  const rawBody = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);

  if (!signature || !(await isValidSignature(rawBody, signature, secret))) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
  }

  let payload: WebhookPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ message: 'Invalid JSON payload' }, { status: 400 });
  }

  const paths = pathsFor(payload);
  for (const path of paths) {
    if (path === PROJECT_DYNAMIC_ROUTE) {
      revalidatePath(PROJECT_DYNAMIC_ROUTE, 'page');
    } else {
      revalidatePath(path);
    }
  }

  return NextResponse.json({ revalidated: true, paths });
}

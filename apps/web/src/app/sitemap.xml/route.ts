import { NextResponse } from 'next/server';
import { BASEURL } from '@/lib/Constants';
import { NAV } from '@/lib/site';
import { projects as projectsData } from '@/lib/data/projects';

// Freshness is webhook-driven (see /api/revalidate); this is only a fallback
// for a missed webhook.
export const revalidate = 86400;

type SanityEntry = {
  slug: string | null;
  publishedAt: string;
};

export async function GET() {
  const allProjects: SanityEntry[] = await projectsData.forSeo();

  const projects = mapSanityEntriesToSitemapEntries(allProjects, '/projects');

  const routes = mapRoutesToSitemapEntries(NAV);

  const allUrls = [...routes, ...projects];
  const sitemapContent = generateSitemapXml(allUrls);

  return new NextResponse(sitemapContent, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

const createSitemapEntry = (path: string, date?: string) => ({
  url: `${BASEURL}${path}`,
  lastModified: date ? new Date(date).toISOString() : undefined,
});

const mapSanityEntriesToSitemapEntries = (
  entries: SanityEntry[],
  pathPrefix: string
) =>
  entries
    .filter(({ slug }) => slug !== null)
    .map(({ slug, publishedAt }) =>
      createSitemapEntry(`${pathPrefix}/${slug}`, publishedAt)
    );

// Static nav routes have no real freshness signal, so they're emitted
// without a <lastmod> rather than stamping the request time as if it meant
// something.
const mapRoutesToSitemapEntries = (routes: readonly { href: string }[]) =>
  routes.map(({ href }) => createSitemapEntry(href));

const generateSitemapXml = (
  urls: { url: string; lastModified?: string }[]
) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
    <url>
      <loc>${url.url}</loc>
      ${url.lastModified ? `<lastmod>${url.lastModified}</lastmod>` : ''}
    </url>
  `
    )
    .join('')}
</urlset>`;
};

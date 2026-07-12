import { NextResponse } from 'next/server';
import { BASEURL } from '@/lib/Constants';
import { NAV } from '@/lib/site';
import { projects as projectsData } from '@/lib/data/projects';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

const createSitemapEntry = (path: string, date: string) => ({
  url: `${BASEURL}${path}`,
  lastModified: new Date(date).toISOString(),
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

const mapRoutesToSitemapEntries = (routes: readonly { href: string }[]) =>
  routes.map(({ href }) => createSitemapEntry(href, new Date().toISOString()));

const generateSitemapXml = (urls: { url: string; lastModified: string }[]) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
    <url>
      <loc>${url.url}</loc>
      <lastmod>${url.lastModified}</lastmod>
    </url>
  `
    )
    .join('')}
</urlset>`;
};

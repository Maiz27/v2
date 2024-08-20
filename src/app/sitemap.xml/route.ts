import { NextResponse } from 'next/server';
import { BASEURL, ROUTES } from '@/lib/Constants';
import { fetchSanityData } from '@/lib/sanity/client';
import { getProjectsForSEO } from '@/lib/sanity/queries';
import { Project } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function generateSitemapXml(urls: { url: string; lastModified: string }[]) {
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
}

export async function GET() {
  const allProjects: Project[] = await fetchSanityData(getProjectsForSEO);

  const posts = allProjects.map(({ slug, date }) => ({
    url: `${BASEURL}/projects/${slug.current}`,
    lastModified: date,
  }));

  const routes = ROUTES.map(({ href }) => ({
    url: `${BASEURL}${href}`,
    lastModified: new Date().toISOString(),
  }));

  const sitemapContent = generateSitemapXml([...routes, ...posts]);

  return new NextResponse(sitemapContent, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

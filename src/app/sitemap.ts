import { BASEURL, ROUTES } from '@/lib/Constants';
import { fetchSanityData } from '@/lib/sanity/client';
import { getProjectsForSEO } from '@/lib/sanity/queries';
import { Project } from '@/lib/types';

export default async function sitemap() {
  const allProjects: Project[] = await fetchSanityData(getProjectsForSEO);

  const posts = allProjects.map(({ slug, date }) => ({
    url: `${BASEURL}/projects/${slug.current}`,
    lastModified: date,
  }));

  const allRoutes = [
    ...ROUTES,
    // add addition routes if needed
  ];

  const _routes = allRoutes.map(({ href }) => ({
    url: `${BASEURL}${href}`,
    lastModified: new Date().toISOString(),
  }));

  return [..._routes, ...posts];
}

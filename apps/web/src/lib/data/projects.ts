/**
 * Typed data access for `project` documents. Each accessor binds one GROQ query
 * to its generated result type in one place, so a call site can never pair the
 * wrong query with the wrong type. The GROQ exports are the existing ones from
 * `lib/sanity/queries`, unchanged — this only collapses the query+type pairing.
 */
import { fetchSanityData } from '@/lib/sanity/client';
import {
  getProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getProjectsForSEO,
  getProjectMetadata,
} from '@/lib/sanity/queries';
import type {
  GetProjectsResult,
  GetFeaturedProjectsResult,
  GetProjectBySlugResult,
  GetProjectsForSEOResult,
  GetProjectMetadataResult,
} from '@/lib/sanity/types';

const read = async <T>(request: () => Promise<T>): Promise<T | null> => {
  try {
    return await request();
  } catch {
    return null;
  }
};

export const projects = {
  /** All projects, newest first. */
  list: () => read(() => fetchSanityData<GetProjectsResult>(getProjects)),
  /** The featured projects for the home page. */
  featured: () =>
    read(() => fetchSanityData<GetFeaturedProjectsResult>(getFeaturedProjects)),
  /**
   * A single project (with full case-study content) by slug. Unlike the
   * degradable reads above, a fetch failure here propagates to the route's
   * error boundary: swallowing it would make the page notFound() a case study
   * that exists, serving a deindexable 404 during a transient outage. A
   * successful null remains the only not-found signal.
   */
  bySlug: (slug: string) =>
    fetchSanityData<GetProjectBySlugResult>(getProjectBySlug, { slug }),
  /** Slug + publish date for every project, for the sitemap. */
  forSeo: () =>
    read(() => fetchSanityData<GetProjectsForSEOResult>(getProjectsForSEO)),
  /** The metadata projection for a single project by slug. */
  metadataFor: (slug: string) =>
    read(() =>
      fetchSanityData<GetProjectMetadataResult>(getProjectMetadata, { slug })
    ),
};

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

export const projects = {
  /** All projects, newest first. */
  list: () => fetchSanityData<GetProjectsResult>(getProjects),
  /** The featured projects for the home page. */
  featured: () => fetchSanityData<GetFeaturedProjectsResult>(getFeaturedProjects),
  /** A single project (with full case-study content) by slug. */
  bySlug: (slug: string) =>
    fetchSanityData<GetProjectBySlugResult>(getProjectBySlug, { slug }),
  /** Slug + publish date for every project, for the sitemap. */
  forSeo: () => fetchSanityData<GetProjectsForSEOResult>(getProjectsForSEO),
  /** The metadata projection for a single project by slug. */
  metadataFor: (slug: string) =>
    fetchSanityData<GetProjectMetadataResult>(getProjectMetadata, { slug }),
};

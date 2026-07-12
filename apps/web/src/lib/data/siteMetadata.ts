/**
 * Typed data access for per-route `metadata` documents. Binds the `getMetadata`
 * GROQ query to its generated result type in one place; used by the shared
 * metadata builder in `lib/metadata`.
 */
import { fetchSanityData } from '@/lib/sanity/client';
import { getMetadata } from '@/lib/sanity/queries';
import type { GetMetadataResult } from '@/lib/sanity/types';

export const siteMetadata = {
  /** The title/description metadata document for a route slug (e.g. '/'). */
  forSlug: (slug: string) =>
    fetchSanityData<GetMetadataResult>(getMetadata, { slug }),
};

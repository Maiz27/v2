import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { QueryParams, SanityClient } from '@sanity/client';

const API_VERSION = '2024-04-09'; // use current date (YYYY-MM-DD) to target the latest API version

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  // Revalidation is webhook-driven (see /api/revalidate) rather than time-based,
  // so fetches only happen right after content actually changes (plus the
  // daily fallback on each page). They need to be authoritative: the CDN
  // cache would still be serving the pre-edit content in the seconds right
  // after the webhook fires, undoing the point of revalidating on-demand.
  useCdn: false,
  apiVersion: API_VERSION,
});

let previewClient: SanityClient | undefined;

/**
 * Token-bearing client for draft preview (see /api/draft). The `drafts`
 * perspective overlays `drafts.<id>` documents on their published versions,
 * which needs a token with read access to drafts. Created lazily so a missing
 * token only fails the preview request, never the published site.
 * SANITY_API_READ_TOKEN has no NEXT_PUBLIC_ prefix, so it is never inlined
 * into a client bundle.
 */
const getPreviewClient = (): SanityClient => {
  if (previewClient) return previewClient;
  const token = process.env.SANITY_API_READ_TOKEN;
  if (!token) {
    throw new Error(
      'SANITY_API_READ_TOKEN is not configured: draft preview needs a Sanity Viewer token'
    );
  }
  previewClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    apiVersion: API_VERSION,
    perspective: 'drafts',
    token,
  });
  return previewClient;
};

export const urlFor = (source: Object) => {
  const builder = imageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
  });
  return builder.image(source);
};

export const fetchSanityData = async <T>(
  query: string,
  variables?: QueryParams
): Promise<T> => {
  try {
    const data = variables
      ? await sanity.fetch<T>(query, variables)
      : await sanity.fetch<T>(query);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

/** `fetchSanityData` against the drafts perspective, for draft preview only. */
export const fetchSanityPreviewData = async <T>(
  query: string,
  variables?: QueryParams
): Promise<T> => {
  try {
    const client = getPreviewClient();
    return variables
      ? await client.fetch<T>(query, variables)
      : await client.fetch<T>(query);
  } catch (error) {
    console.error('Error fetching preview data:', error);
    throw error;
  }
};

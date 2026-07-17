import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { QueryParams } from '@sanity/client';

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  // Revalidation is webhook-driven (see /api/revalidate) rather than time-based,
  // so fetches only happen right after content actually changes (plus the
  // daily fallback on each page). They need to be authoritative: the CDN
  // cache would still be serving the pre-edit content in the seconds right
  // after the webhook fires, undoing the point of revalidating on-demand.
  useCdn: false,
  apiVersion: '2024-04-09', // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});

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

import { urlFor } from '@/lib/sanity/client';

type SanityImageSource = Parameters<typeof urlFor>[0];

/** Build the final URL for a Sanity image reference. */
export const buildImageUrl = (source: SanityImageSource): string =>
  urlFor(source).url();

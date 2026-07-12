/**
 * Typed data access for the `aboutMe` singleton. Binds the `getAboutMe` GROQ
 * query to its generated result type in one place.
 */
import { fetchSanityData } from '@/lib/sanity/client';
import { getAboutMe } from '@/lib/sanity/queries';
import type { GetAboutMeResult } from '@/lib/sanity/types';

export const about = {
  /** The About section content (bio, hero copy, contact links). */
  get: () => fetchSanityData<GetAboutMeResult>(getAboutMe),
};

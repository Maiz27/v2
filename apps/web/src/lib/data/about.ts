/**
 * Typed data access for the `aboutMe` singleton. Binds the `getAboutMe` GROQ
 * query to its generated result type in one place.
 */
import { cache } from 'react';
import { fetchSanityData } from '@/lib/sanity/client';
import { getAboutMe } from '@/lib/sanity/queries';
import type { GetAboutMeResult } from '@/lib/sanity/types';

const getAboutMeData = cache(async (): Promise<GetAboutMeResult | null> => {
  try {
    return await fetchSanityData<GetAboutMeResult>(getAboutMe);
  } catch {
    return null;
  }
});

export const about = {
  /** The About section content (bio, hero copy, contact links). */
  get: getAboutMeData,
};

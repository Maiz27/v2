/** Typed, failure-tolerant access to the Sanity `cv` singleton. */
import { fetchSanityData } from '@/lib/sanity/client';
import { getCv } from '@/lib/sanity/queries';
import type { GetCvResult } from '@/lib/sanity/types';

export const cv = {
  get: async (): Promise<GetCvResult | null> => {
    try {
      return await fetchSanityData<GetCvResult>(getCv);
    } catch {
      return null;
    }
  },
};

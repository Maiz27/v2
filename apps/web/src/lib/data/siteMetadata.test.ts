import { beforeEach, describe, expect, it, vi } from 'vitest';

const fetchSanityData = vi.hoisted(() => vi.fn());

vi.mock('@/lib/sanity/client', () => ({ fetchSanityData }));
vi.mock('@/lib/sanity/queries', () => ({ getMetadata: 'getMetadata' }));

import { siteMetadata } from './siteMetadata';

describe('site metadata accessor', () => {
  beforeEach(() => {
    fetchSanityData.mockReset();
  });

  it('passes successful results through', async () => {
    const result = { title: 'Home' };
    fetchSanityData.mockResolvedValueOnce(result);

    await expect(siteMetadata.forSlug('/')).resolves.toBe(result);
    expect(fetchSanityData).toHaveBeenCalledWith('getMetadata', { slug: '/' });
  });

  it('returns null when the read fails', async () => {
    fetchSanityData.mockRejectedValueOnce(new Error('Sanity unavailable'));

    await expect(siteMetadata.forSlug('/')).resolves.toBeNull();
  });
});

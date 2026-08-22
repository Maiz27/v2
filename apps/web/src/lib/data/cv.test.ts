import { beforeEach, describe, expect, it, vi } from 'vitest';

const fetchSanityData = vi.hoisted(() => vi.fn());

vi.mock('@/lib/sanity/client', () => ({ fetchSanityData }));
vi.mock('@/lib/sanity/queries', () => ({ getCv: 'getCv' }));

import { cv } from './cv';

describe('CV data accessor', () => {
  beforeEach(() => {
    fetchSanityData.mockReset();
  });

  it('passes successful results through', async () => {
    const result = { summary: 'Summary' };
    fetchSanityData.mockResolvedValueOnce(result);

    await expect(cv.get()).resolves.toBe(result);
    expect(fetchSanityData).toHaveBeenCalledWith('getCv');
  });

  it('returns null when the read fails', async () => {
    fetchSanityData.mockRejectedValueOnce(new Error('Sanity unavailable'));

    await expect(cv.get()).resolves.toBeNull();
  });
});

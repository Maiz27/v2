import { beforeEach, describe, expect, it, vi } from 'vitest';

const fetchSanityData = vi.hoisted(() => vi.fn());
const cacheControl = vi.hoisted(() => ({
  resetters: new Set<() => void>(),
}));

vi.mock('@/lib/sanity/client', () => ({ fetchSanityData }));
vi.mock('@/lib/sanity/queries', () => ({ getAboutMe: 'getAboutMe' }));
vi.mock('react', async (importOriginal) => {
  const react = await importOriginal<typeof import('react')>();

  return {
    ...react,
    cache: <Args extends unknown[], Result>(
      read: (...args: Args) => Result
    ) => {
      let state:
        | { kind: 'empty' }
        | { kind: 'ready'; value: Result } = { kind: 'empty' };

      cacheControl.resetters.add(() => {
        state = { kind: 'empty' };
      });

      return (...args: Args): Result => {
        if (state.kind === 'ready') return state.value;

        const value = read(...args);
        state = { kind: 'ready', value };
        return value;
      };
    },
  };
});

import { about } from './about';

describe('about data accessor', () => {
  beforeEach(() => {
    fetchSanityData.mockReset();
    cacheControl.resetters.forEach((reset) => reset());
  });

  it('passes successful results through', async () => {
    const result = { role: 'Developer' };
    fetchSanityData.mockResolvedValueOnce(result);

    await expect(about.get()).resolves.toBe(result);
    expect(fetchSanityData).toHaveBeenCalledWith('getAboutMe');
  });

  it('returns null when the read fails', async () => {
    fetchSanityData.mockRejectedValueOnce(new Error('Sanity unavailable'));

    await expect(about.get()).resolves.toBeNull();
  });

  it('deduplicates two awaited reads in one render cache', async () => {
    const result = { role: 'Developer' };
    fetchSanityData.mockResolvedValueOnce(result);

    await about.get();
    await about.get();

    expect(fetchSanityData).toHaveBeenCalledOnce();
  });
});

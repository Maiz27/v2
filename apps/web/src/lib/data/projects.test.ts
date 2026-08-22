import { beforeEach, describe, expect, it, vi } from 'vitest';

const fetchSanityData = vi.hoisted(() => vi.fn());

vi.mock('@/lib/sanity/client', () => ({ fetchSanityData }));
vi.mock('@/lib/sanity/queries', () => ({
  getFeaturedProjects: 'getFeaturedProjects',
  getProjectBySlug: 'getProjectBySlug',
  getProjectMetadata: 'getProjectMetadata',
  getProjects: 'getProjects',
  getProjectsForSEO: 'getProjectsForSEO',
}));

import { projects } from './projects';

type AccessorCase = {
  name: string;
  query: string;
  read: () => Promise<unknown>;
  variables?: { slug: string };
};

const accessorCases: AccessorCase[] = [
  {
    name: 'list',
    query: 'getProjects',
    read: () => projects.list(),
  },
  {
    name: 'featured',
    query: 'getFeaturedProjects',
    read: () => projects.featured(),
  },
  {
    name: 'bySlug',
    query: 'getProjectBySlug',
    read: () => projects.bySlug('example'),
    variables: { slug: 'example' },
  },
  {
    name: 'forSeo',
    query: 'getProjectsForSEO',
    read: () => projects.forSeo(),
  },
  {
    name: 'metadataFor',
    query: 'getProjectMetadata',
    read: () => projects.metadataFor('example'),
    variables: { slug: 'example' },
  },
];

describe('project data accessors', () => {
  beforeEach(() => {
    fetchSanityData.mockReset();
  });

  it.each(accessorCases)('passes $name results through', async ({ query, read, variables }) => {
    const result = { query };
    fetchSanityData.mockResolvedValueOnce(result);

    await expect(read()).resolves.toBe(result);
    expect(fetchSanityData).toHaveBeenCalledWith(
      query,
      ...(variables ? [variables] : [])
    );
  });

  it.each(accessorCases)('returns null when $name fails', async ({ read }) => {
    fetchSanityData.mockRejectedValueOnce(new Error('Sanity unavailable'));

    await expect(read()).resolves.toBeNull();
  });
});

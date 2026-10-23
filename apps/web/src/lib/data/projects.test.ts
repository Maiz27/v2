import { beforeEach, describe, expect, it, vi } from 'vitest';

const { fetchSanityData, fetchSanityPreviewData } = vi.hoisted(() => ({
  fetchSanityData: vi.fn(),
  fetchSanityPreviewData: vi.fn(),
}));

vi.mock('@/lib/sanity/client', () => ({ fetchSanityData, fetchSanityPreviewData }));
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

/* Reads whose failure must not read as an empty result: bySlug would
   notFound() a live case study, forSeo would cache a projects-less sitemap.
   Both propagate instead (error boundary / stale cached response). */
const propagatingCases: AccessorCase[] = [
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
];

const degradableCases: AccessorCase[] = [
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
    name: 'metadataFor',
    query: 'getProjectMetadata',
    read: () => projects.metadataFor('example'),
    variables: { slug: 'example' },
  },
];

const accessorCases: AccessorCase[] = [...degradableCases, ...propagatingCases];

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

  it.each(degradableCases)('returns null when $name fails', async ({ read }) => {
    fetchSanityData.mockRejectedValueOnce(new Error('Sanity unavailable'));

    await expect(read()).resolves.toBeNull();
  });

  it.each(propagatingCases)(
    'propagates fetch failures from $name',
    async ({ read }) => {
      const failure = new Error('Sanity unavailable');
      fetchSanityData.mockRejectedValueOnce(failure);

      await expect(read()).rejects.toBe(failure);
    }
  );
});

describe('draftBySlug', () => {
  beforeEach(() => {
    fetchSanityData.mockReset();
    fetchSanityPreviewData.mockReset();
  });

  it('runs the bySlug query through the preview client', async () => {
    const result = { query: 'getProjectBySlug' };
    fetchSanityPreviewData.mockResolvedValueOnce(result);

    await expect(projects.draftBySlug('example')).resolves.toBe(result);
    expect(fetchSanityPreviewData).toHaveBeenCalledWith('getProjectBySlug', {
      slug: 'example',
    });
    expect(fetchSanityData).not.toHaveBeenCalled();
  });

  it('propagates preview fetch failures', async () => {
    const failure = new Error('SANITY_API_READ_TOKEN is not configured');
    fetchSanityPreviewData.mockRejectedValueOnce(failure);

    await expect(projects.draftBySlug('example')).rejects.toBe(failure);
  });
});

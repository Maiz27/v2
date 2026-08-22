import { describe, expect, it, vi } from 'vitest';

vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }));
vi.mock('next/server', () => ({
  NextRequest: class NextRequest {},
  NextResponse: { json: vi.fn() },
}));
vi.mock('@sanity/webhook', () => ({
  isValidSignature: vi.fn(),
  SIGNATURE_HEADER_NAME: 'sanity-webhook-signature',
}));

import { pathsFor } from '../route';

describe('pathsFor', () => {
  it('maps project documents with a slug to every project surface', () => {
    expect(pathsFor({ _type: 'project', slug: 'example' })).toEqual([
      '/projects/example',
      '/',
      '/projects',
      '/sitemap.xml',
    ]);
  });

  it('maps project documents without a slug to the collection surfaces', () => {
    expect(pathsFor({ _type: 'project' })).toEqual([
      '/',
      '/projects',
      '/sitemap.xml',
    ]);
  });

  it.each([
    ['aboutMe', ['/']],
    ['cv', ['/cv']],
    ['metadata', ['/projects']],
  ])('maps %s documents to their direct route', (_type: string, expected: string[]) => {
    const slug = _type === 'metadata' ? '/projects' : undefined;
    expect(pathsFor({ _type, slug })).toEqual(expected);
  });

  it('rejects metadata slugs that are not route paths', () => {
    expect(pathsFor({ _type: 'metadata', slug: 'projects' })).toEqual([]);
    expect(pathsFor({ _type: 'metadata' })).toEqual([]);
  });

  it.each(['tool', 'experience', 'kind', 'unrecognized']) (
    'broadly revalidates referenced document type %s',
    (_type: string) => {
      expect(pathsFor({ _type })).toEqual([
        '/',
        '/projects',
        '/cv',
        '/sitemap.xml',
        '/projects/[slug]',
      ]);
    }
  );
});

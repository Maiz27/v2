import { describe, expect, it, vi } from 'vitest';
import { NAV } from '@/lib/site';

vi.mock('@/lib/Constants', () => ({
  BASEURL: 'https://www.example.com',
}));
vi.mock('next/server', () => ({ NextResponse: class NextResponse {} }));
vi.mock('@/lib/data/projects', () => ({
  projects: { forSeo: vi.fn() },
}));

import {
  generateSitemapXml,
  mapRoutesToSitemapEntries,
  mapSanityEntriesToSitemapEntries,
} from './route';

describe('sitemap builders', () => {
  it('maps every NAV route without fabricated modification dates', () => {
    expect(mapRoutesToSitemapEntries(NAV)).toEqual([
      { url: 'https://www.example.com/', lastModified: undefined },
      { url: 'https://www.example.com/projects', lastModified: undefined },
      { url: 'https://www.example.com/cv', lastModified: undefined },
    ]);
  });

  it('maps dated project entries and omits projects without slugs', () => {
    expect(
      mapSanityEntriesToSitemapEntries(
        [
          { slug: 'first', publishedAt: '2026-02-03' },
          { slug: null, publishedAt: '2026-03-04' },
        ],
        '/projects'
      )
    ).toEqual([
      {
        url: 'https://www.example.com/projects/first',
        lastModified: '2026-02-03T00:00:00.000Z',
      },
    ]);
  });

  it('emits sitemap XML with optional last-modified dates', () => {
    const xml = generateSitemapXml([
      { url: 'https://www.example.com/' },
      {
        url: 'https://www.example.com/projects/first',
        lastModified: '2026-02-03T00:00:00.000Z',
      },
    ]);

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<loc>https://www.example.com/</loc>');
    expect(xml).toContain(
      '<lastmod>2026-02-03T00:00:00.000Z</lastmod>'
    );
  });

  it('escapes XML-reserved characters in URLs', () => {
    const xml = generateSitemapXml([
      { url: 'https://www.example.com/projects/a&b?x=1&y=<2>' },
    ]);

    expect(xml).toContain(
      '<loc>https://www.example.com/projects/a&amp;b?x=1&amp;y=&lt;2&gt;</loc>'
    );
    expect(xml).not.toContain('a&b');
  });
});

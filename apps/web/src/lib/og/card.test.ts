import { describe, expect, it } from 'vitest';
import { headingSize, thumbnailUrl } from './card';

describe('thumbnailUrl', () => {
  it('adds the bounded-width Sanity CDN params', () => {
    const url = new URL(
      thumbnailUrl('https://cdn.sanity.io/images/p/d/abc-350x350.png')
    );
    expect(url.searchParams.get('w')).toBe('800');
    expect(url.searchParams.get('fit')).toBe('max');
    expect(url.searchParams.get('auto')).toBe('format');
  });

  it('overrides params already on the URL instead of duplicating them', () => {
    const url = thumbnailUrl('https://cdn.sanity.io/x.png?w=2000');
    expect(url).toBe('https://cdn.sanity.io/x.png?w=800&fit=max&auto=format');
  });
});

describe('headingSize', () => {
  it('steps down as the heading grows', () => {
    const short = headingSize('Zim', true);
    const long = headingSize('x'.repeat(80), true);
    expect(short).toBeGreaterThan(long);
  });

  it('allows a larger size when there is no thumbnail column', () => {
    const text = 'Building Follow Sync without an always-on backend';
    expect(headingSize(text, false)).toBeGreaterThan(headingSize(text, true));
  });
});

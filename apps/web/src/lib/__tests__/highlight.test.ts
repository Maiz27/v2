import { describe, expect, it } from 'vitest';
import { highlight, highlightAnnotated } from '@/lib/highlight';

describe('highlight', () => {
  it('uses Nord with the listing contrast replacements', async () => {
    const html = await highlight('// explanatory comment\nconst value = 1;', 'typescript');

    expect(html).toContain('#8992a6');
    expect(html.toLowerCase()).not.toMatch(/#616e88|#bf616a|#5e81ac/);
  });
});

describe('highlightAnnotated', () => {
  it('renders resolved annotation data attributes', async () => {
    const { html, misses } = await highlightAnnotated(
      'const value = 1;',
      'typescript',
      [
        {
          id: 'why-value',
          kind: 'decision',
          match: 'value',
          body: 'A stable example.',
        },
      ]
    );

    expect(misses).toEqual([]);
    expect(html).toContain('data-annot="why-value"');
    expect(html).toContain('data-kind="decision"');
    expect(html).toContain('data-n="1"');
  });
});

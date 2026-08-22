import { describe, expect, it } from 'vitest';
import { resolveAnnotations } from '@/lib/annotations';

describe('resolveAnnotations', () => {
  it('resolves matches and preserves annotation metadata', () => {
    const result = resolveAnnotations('alpha beta', [
      {
        id: 'decision-1',
        kind: 'decision',
        match: 'beta',
        body: 'Why beta was chosen.',
      },
    ]);

    expect(result).toEqual({
      ranges: [
        {
          start: 6,
          end: 10,
          properties: {
            class: 'annot annot-decision',
            'data-annot': 'decision-1',
            'data-kind': 'decision',
            'data-n': '1',
            tabindex: 0,
          },
        },
      ],
      misses: [],
    });
  });

  it('counts overlapping occurrences from one', () => {
    const result = resolveAnnotations('aaaa', [
      {
        id: 'context-2',
        kind: 'context',
        match: 'aa',
        occurrence: 2,
        body: 'The overlapping second match.',
      },
    ]);

    expect(result.ranges[0]).toMatchObject({ start: 1, end: 3 });
  });

  it('records bad matches as misses without throwing or renumbering survivors', () => {
    expect(() =>
      resolveAnnotations('const answer = 42;', [
        {
          id: 'missing',
          kind: 'context',
          match: 'not present',
          body: 'Stale annotation.',
        },
        {
          id: 'answer',
          kind: 'decision',
          match: 'answer',
          body: 'Still resolves.',
        },
      ])
    ).not.toThrow();

    const result = resolveAnnotations('const answer = 42;', [
      {
        id: 'missing',
        kind: 'context',
        match: 'not present',
        body: 'Stale annotation.',
      },
      {
        id: 'answer',
        kind: 'decision',
        match: 'answer',
        body: 'Still resolves.',
      },
    ]);

    expect(result.misses).toEqual([{ id: 'missing', match: 'not present' }]);
    expect(result.ranges).toHaveLength(1);
    expect(result.ranges[0].properties?.['data-n']).toBe('2');
  });
});

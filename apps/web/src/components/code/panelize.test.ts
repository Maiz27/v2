import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Snippet } from '@/lib/sanity/types';

const highlighters = vi.hoisted(() => ({
  highlight: vi.fn(async (code: string, language: string) =>
    `plain:${language}:${code}`
  ),
  highlightAnnotated: vi.fn(
    async (code: string, language: string) => ({
      html: `annotated:${language}:${code}`,
      misses: [],
    })
  ),
}));

vi.mock('@/lib/highlight', () => highlighters);

import { panelize } from './panelize';

type AuthoredAnnotation = NonNullable<Snippet['annotations']>[number];

describe('panelize', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('defaults missing code, language, source, and annotations', async () => {
    const panel = await panelize({
      panelKey: 'single',
      snippet: {
        _type: 'snippet',
        filename: 'src/empty.ts',
        code: { _type: 'code' },
      },
    });

    expect(highlighters.highlight).toHaveBeenCalledWith('', 'typescript');
    expect(panel).toEqual({
      panelKey: 'single',
      html: 'plain:typescript:',
      filename: 'src/empty.ts',
      source: null,
      annotations: [],
    });
  });

  it('uses authored annotations and the annotated highlighter', async () => {
    const annotation = {
      _type: 'codeAnnotation',
      _key: 'note-key',
      id: 'note',
      kind: 'decision',
      match: 'answer',
      body: 'Why this value exists.',
    } satisfies AuthoredAnnotation;
    const panel = await panelize({
      panelKey: 'group:tab',
      snippet: {
        _type: 'snippet',
        filename: 'src/answer.ts',
        source: 'https://example.com/source',
        code: { _type: 'code', language: 'tsx', code: 'const answer = 42;' },
        annotations: [annotation],
      },
    });

    expect(highlighters.highlightAnnotated).toHaveBeenCalledWith(
      'const answer = 42;',
      'tsx',
      [annotation]
    );
    expect(panel.annotations).toEqual([annotation]);
    expect(panel.html).toBe('annotated:tsx:const answer = 42;');
  });

  it('prefers override annotations over the authored ones', async () => {
    const authored = {
      _type: 'codeAnnotation',
      _key: 'authored-key',
      id: 'authored',
      kind: 'context',
      match: 'answer',
      body: 'Authored on the snippet.',
    } satisfies AuthoredAnnotation;
    const override = {
      _type: 'codeAnnotation',
      _key: 'override-key',
      id: 'override',
      kind: 'decision',
      match: '42',
      body: 'Passed in by the caller.',
    } satisfies AuthoredAnnotation;

    const panel = await panelize({
      panelKey: 'group:tab',
      snippet: {
        _type: 'snippet',
        filename: 'src/answer.ts',
        code: { _type: 'code', language: 'tsx', code: 'const answer = 42;' },
        annotations: [authored],
      },
      annotations: [override],
    });

    expect(highlighters.highlightAnnotated).toHaveBeenCalledWith(
      'const answer = 42;',
      'tsx',
      [override]
    );
    expect(panel.annotations).toEqual([override]);
  });
});

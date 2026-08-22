import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/data/siteMetadata', () => ({
  siteMetadata: { forSlug: vi.fn() },
}));

import type { BlockContent } from '@/lib/sanity/types';
import { buildOutline, plainText } from '@/lib/outline';

describe('plainText', () => {
  it('joins text spans and skips non-span children', () => {
    expect(
      plainText({
        children: [
          { text: 'Marked ' },
          null,
          { other: 'ignored' },
          { text: 'heading' },
        ],
      })
    ).toBe('Marked heading');
  });
});

describe('buildOutline', () => {
  it('numbers h2 headings, creates snippet anchors, and resolves entries by key', () => {
    const content: BlockContent = [
      {
        _type: 'block',
        _key: 'heading-1',
        style: 'h2',
        children: [{ _type: 'span', _key: 'span-1', text: 'First section' }],
      },
      {
        _type: 'block',
        _key: 'subheading',
        style: 'h3',
        children: [{ _type: 'span', _key: 'span-2', text: 'Details' }],
      },
      {
        _type: 'snippet',
        _key: 'snippet-1',
        filename: 'src/index.ts',
        code: { _type: 'code', code: 'export {}' },
      },
      {
        _type: 'snippetGroup',
        _key: 'group-1',
        title: 'Related files',
        snippets: [],
      },
      {
        _type: 'block',
        _key: 'heading-2',
        style: 'h2',
        children: [{ _type: 'span', _key: 'span-3', text: 'Second section' }],
      },
    ];

    const outline = buildOutline(content);

    expect(outline.items).toEqual([
      {
        type: 'h2',
        id: 'first-section',
        text: 'First section',
        n: '01',
        key: 'heading-1',
      },
      { type: 'h3', id: 'details', text: 'Details', key: 'subheading' },
      {
        type: 'code',
        id: 'Snippet-1',
        text: 'src/index.ts',
        key: 'snippet-1',
      },
      {
        type: 'code',
        id: 'Snippet-2',
        text: 'Related files',
        key: 'group-1',
      },
      {
        type: 'h2',
        id: 'second-section',
        text: 'Second section',
        n: '02',
        key: 'heading-2',
      },
    ]);
    expect(outline.itemFor('snippet-1')).toEqual(outline.items[2]);
    expect(outline.itemFor(undefined)).toBeUndefined();
  });

  it('suffixes colliding heading slugs and ignores body-only headings', () => {
    const content: BlockContent = [
      {
        _type: 'block',
        _key: 'same-1',
        style: 'h2',
        children: [{ _type: 'span', _key: 'span-1', text: 'Same title' }],
      },
      {
        _type: 'block',
        _key: 'same-2',
        style: 'h3',
        children: [{ _type: 'span', _key: 'span-2', text: 'Same title' }],
      },
      {
        _type: 'block',
        _key: 'same-3',
        style: 'h2',
        children: [{ _type: 'span', _key: 'span-3', text: 'Same title' }],
      },
      {
        _type: 'block',
        _key: 'ignored-h4',
        style: 'h4',
        children: [{ _type: 'span', _key: 'span-4', text: 'Body heading' }],
      },
    ];

    expect(buildOutline(content).items.map(({ id }) => id)).toEqual([
      'same-title',
      'same-title-1',
      'same-title-2',
    ]);
  });
});

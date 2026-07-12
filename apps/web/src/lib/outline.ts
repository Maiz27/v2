import { createSlug } from '@/lib/utilities';
import { CODE_ID_PREFIX } from '@/lib/Constants';
import { BlockContent, Snippet, SnippetGroup } from '@/lib/sanity/types';

/**
 * A single entry in a case study's outline. `key` is the Portable Text block's
 * stable `_key`, so a renderer can look its entry up by block rather than by
 * re-deriving the id from scratch.
 */
export type OutlineItem =
  | { type: 'h2'; id: string; text: string; n: string; key: string }
  | { type: 'h3'; id: string; text: string; key: string }
  | { type: 'code'; id: string; text: string; key: string };

/** Heading levels that make it into the Contents rail. h4 is body-only. */
const OUTLINE_HEADING_TAGS = ['h2', 'h3'];

/**
 * Flatten a Portable Text block's spans to their plain text. Using this instead
 * of `children?.toString()` on the rendered React tree matters: React nodes
 * stringify to "[object Object]" the moment a heading carries any inline mark
 * (em/strong/code/link), which would poison the slug. The `'text' in child`
 * guard skips non-span children safely.
 */
export const plainText = (block: {
  children?: Array<{ text?: string } | unknown>;
}): string =>
  (block.children ?? [])
    .map((child) =>
      child && typeof child === 'object' && 'text' in child
        ? ((child as { text?: string }).text ?? '')
        : ''
    )
    .join('');

/**
 * Walk a case study's Portable Text exactly once and derive the whole outline:
 * the ordered TOC items the Contents rail renders, plus a per-block lookup so
 * RichTextParser can ask for the id (and h2 index) of any block it is about to
 * render, keyed by the block's stable `_key`.
 *
 * This is the single source of truth for heading ids, the numbered h2 badge and
 * code-snippet ids. Contents and RichTextParser used to walk the content
 * independently with their own counters and slug logic and had to stay in
 * lockstep by hand; now they both read from here.
 */
export function buildOutline(content: BlockContent): {
  items: OutlineItem[];
  itemFor: (key: string | undefined) => OutlineItem | undefined;
} {
  const items: OutlineItem[] = [];
  const byKey = new Map<string, OutlineItem>();
  let headingCounter = 0;
  let codeBlockCounter = 0;

  const push = (item: OutlineItem) => {
    items.push(item);
    byKey.set(item.key, item);
  };

  content.forEach((block) => {
    if (
      block._type === 'block' &&
      OUTLINE_HEADING_TAGS.includes(block.style ?? '')
    ) {
      const text = plainText(block);
      if (!text) return;
      const baseId = createSlug(text);
      let id = baseId;
      const existing = Array.from(byKey.values()).some(
        (item) => item.id === id
      );
      if (existing) {
        let suffix = 1;
        while (Array.from(byKey.values()).some((item) => item.id === `${baseId}-${suffix}`)) {
          suffix++;
        }
        id = `${baseId}-${suffix}`;
      }
      if (block.style === 'h2') {
        push({
          type: 'h2',
          id,
          text,
          n: String(++headingCounter).padStart(2, '0'),
          key: block._key,
        });
      } else {
        push({ type: 'h3', id, text, key: block._key });
      }
      return;
    }

    if (block._type === 'snippet') {
      const { filename } = block as { _key: string } & Snippet;
      push({
        type: 'code',
        id: `${CODE_ID_PREFIX}${++codeBlockCounter}`,
        text: filename,
        key: block._key,
      });
      return;
    }

    if (block._type === 'snippetGroup') {
      const group = block as { _key: string } & SnippetGroup;
      push({
        type: 'code',
        id: `${CODE_ID_PREFIX}${++codeBlockCounter}`,
        text: group.title || group.snippets[0]?.filename || 'Snippets',
        key: block._key,
      });
    }
  });

  return {
    items,
    itemFor: (key: string | undefined) =>
      key ? byKey.get(key) : undefined,
  };
}

import { createSlug } from '@/lib/utilities';
import { CODE_ID_PREFIX } from '@/lib/Constants';
import { BlockContent, Snippet, SnippetGroup } from '@/lib/sanity/types';

type Item =
  | { type: 'h2'; id: string; text: string; n: string }
  | { type: 'h3'; id: string; text: string }
  | { type: 'code'; id: string; text: string };

const HEADING_TAGS = ['h2', 'h3'];

/**
 * The case-study Contents rail, driven by the real Portable Text. It indexes
 * every section heading (h2 numbered to match the body index, h3 nested) and
 * every code snippet by filename, mirroring the counters in RichTextParser so
 * the anchors line up. Nobody maintains this list by hand.
 */
const Contents = ({ content }: { content: BlockContent }) => {
  const items: Item[] = [];
  let headingCounter = 0;
  let codeBlockCounter = 0;

  content.forEach((block) => {
    if (block._type === 'block' && HEADING_TAGS.includes(block.style ?? '')) {
      const text = block.children
        ?.map((child) => child.text)
        .filter(Boolean)
        .join('');
      if (!text) return;
      if (block.style === 'h2') {
        items.push({
          type: 'h2',
          id: createSlug(text),
          text,
          n: String(++headingCounter).padStart(2, '0'),
        });
      } else {
        items.push({ type: 'h3', id: createSlug(text), text });
      }
    }

    if (block._type === 'snippet') {
      const { filename } = block as Snippet;
      items.push({
        type: 'code',
        id: `${CODE_ID_PREFIX}${++codeBlockCounter}`,
        text: filename,
      });
    }

    if (block._type === 'snippetGroup') {
      const group = block as SnippetGroup;
      items.push({
        type: 'code',
        id: `${CODE_ID_PREFIX}${++codeBlockCounter}`,
        text: group.title || group.snippets[0]?.filename || 'Snippets',
      });
    }
  });

  if (items.length === 0) return null;

  return (
    <nav className='mb-12 lg:mb-0' aria-label='Contents'>
      <div className='lg:sticky lg:top-10'>
        <p className='mb-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-faint'>
          Contents
        </p>
        <ol className='space-y-2.5'>
          {items.map((item, i) => {
            if (item.type === 'h2') {
              return (
                <li key={i}>
                  <a
                    href={`#${item.id}`}
                    className='group flex gap-2 font-mono text-[0.72rem] leading-snug text-ink-soft hover:text-mark'
                  >
                    <span className='text-mark'>{item.n}</span>
                    <span className='underline decoration-transparent underline-offset-4 transition-colors duration-200 group-hover:decoration-dotted group-hover:decoration-current'>
                      {item.text}
                    </span>
                  </a>
                </li>
              );
            }
            if (item.type === 'h3') {
              return (
                <li key={i} className='ml-6'>
                  <a
                    href={`#${item.id}`}
                    className='block font-mono text-[0.68rem] leading-snug text-ink-faint hover:text-mark'
                  >
                    {item.text}
                  </a>
                </li>
              );
            }
            return (
              <li key={i} className='ml-6'>
                <a
                  href={`#${item.id}`}
                  className='block truncate font-mono text-[0.66rem] leading-snug text-ink-faint hover:text-mark'
                  title={item.text}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Contents;

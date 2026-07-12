import { buildOutline } from '@/lib/outline';
import { BlockContent } from '@/lib/sanity/types';

/**
 * The case-study Contents rail, driven by the real Portable Text. It indexes
 * every section heading (h2 numbered to match the body index, h3 nested) and
 * every code snippet by filename. The list — including the ids/anchors and the
 * numbered h2 badge — comes straight from `buildOutline`, the same single
 * traversal RichTextParser renders against, so the anchors always line up and
 * nobody maintains this list by hand.
 */
const Contents = ({ content }: { content: BlockContent }) => {
  const { items } = buildOutline(content);

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

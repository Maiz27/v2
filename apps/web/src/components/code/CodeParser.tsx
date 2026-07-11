import { highlight, highlightAnnotated } from '@/lib/highlight';
import type { CodeAnnotation } from '@/lib/annotations';
import { Snippet } from '@/lib/sanity/types';
import AnnotatedListing from './AnnotatedListing';

type Props = {
  id: string;
  snippet: Snippet;
  isGroup?: boolean;
  /**
   * Optional authored annotations. Real Sanity snippets carry none yet, so the
   * listing renders plain today; when notes are attached it becomes the hybrid
   * margin-notes / popover listing. The component API is ready either way.
   */
  annotations?: CodeAnnotation[];
};

/**
 * A single code listing on a case study, highlighted on the server with Shiki
 * (theme vitesse-light) and set on the paper-raised surface. With annotations
 * it upgrades to the interactive AnnotatedListing; without, it is a plain
 * Ledger listing: a figcaption with the filename and a view-source link.
 */
const CodeParser = async ({ id, snippet, isGroup, annotations }: Props) => {
  const { filename, source } = snippet;
  const { language, code } = snippet.code;
  const text = code ?? '';
  const lang = language || 'typescript';

  if (annotations && annotations.length > 0) {
    const html = await highlightAnnotated(text, lang, annotations);
    return (
      <div id={id} className='scroll-m-16'>
        <AnnotatedListing
          html={html}
          filename={filename}
          source={source}
          annotations={annotations}
          isGroup={isGroup}
        />
      </div>
    );
  }

  const html = await highlight(text, lang);

  // Inside a snippet group the tabs own the filename/source chrome, so an item
  // renders as a bare code panel.
  if (isGroup) {
    return (
      <div
        id={id}
        data-nosnippet
        className='scroll-m-16'
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <figure id={id} className='my-10 scroll-m-16'>
      {!isGroup && (
        <figcaption className='flex items-baseline justify-between gap-4 border border-b-0 border-rule bg-paper-raised px-4 py-2.5'>
          <span className='font-mono text-[0.75rem] text-ink-soft'>
            {filename}
          </span>
          {source && (
            <a
              href={source}
              target='_blank'
              rel='noreferrer noopener'
              className='link-underline shrink-0 font-mono text-[0.7rem] text-mark'
            >
              view source
            </a>
          )}
        </figcaption>
      )}
      <div
        data-nosnippet
        className='border border-rule'
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
};

export default CodeParser;

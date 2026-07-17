import { highlight, highlightAnnotated } from '@/lib/highlight';
import type { CodeAnnotation } from '@/lib/annotations';
import { Snippet } from '@/lib/sanity/types';
import AnnotatedListing from './AnnotatedListing';

type Props = {
  id: string;
  snippet: Snippet;
  /**
   * Optional authored annotations. Case-study snippets carry these today,
   * which upgrades the listing to the hybrid margin-notes / popover view;
   * without them (or on a future snippet with none) it stays a plain listing.
   */
  annotations?: CodeAnnotation[];
};

/**
 * A single, standalone code listing on a case study, highlighted on the
 * server with Shiki (theme vitesse-light) and set on the paper-raised
 * surface. Case-study snippets are annotated today, so this renders the
 * interactive AnnotatedListing; without annotations it falls back to a plain
 * Ledger listing: a figcaption with the filename and a view-source link.
 *
 * A tabbed group of snippets does not go through this component — see
 * CodeGroup, which does its own server-side highlighting so a group can share
 * one code panel + notes rail across tabs instead of mounting one of these
 * per tab.
 */
const CodeParser = async ({ id, snippet, annotations }: Props) => {
  const { filename, source } = snippet;
  const { language, code } = snippet.code;
  const text = code ?? '';
  const lang = language || 'typescript';

  if (annotations && annotations.length > 0) {
    const { html } = await highlightAnnotated(text, lang, annotations);
    return (
      <div id={id} className='scroll-m-16'>
        <AnnotatedListing html={html} filename={filename} source={source} annotations={annotations} />
      </div>
    );
  }

  const html = await highlight(text, lang);

  return (
    <figure id={id} className='my-10 scroll-m-16 min-w-0'>
      <figcaption className='flex items-baseline justify-between gap-4 min-w-0 border border-b-0 border-rule bg-paper-raised px-4 py-2.5'>
        <span className='font-mono text-[0.75rem] text-ink-soft truncate'>
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
      <div
        data-nosnippet
        className='border border-rule'
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
};

export default CodeParser;

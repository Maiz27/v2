'use client';

import type { CodeAnnotation } from '@/lib/annotations';
import { useAnnotatedCode } from './useAnnotatedCode';
import NotesRail, { LISTING_GRID } from './NotesRail';
import AnnotationPopover from './AnnotationPopover';

type Props = {
  html: string;
  filename: string;
  source?: string | null;
  annotations: CodeAnnotation[];
};

/**
 * The Ledger listing reads like a printed page. On xl+ the annotations sit
 * beside it as numbered margin notes: hovering a proof mark lights its note,
 * clicking a mark pins it so the note stays lit while you scan the code (click
 * again or Esc to release). Below xl the margin does not fit, so hovering a
 * mark (pointer devices) opens a small popover at the token, and clicking pins
 * it open. On touch there is no hover, so the popover is driven purely by the
 * pin: a tap opens it, and tapping the mark again, tapping outside the figure,
 * or Esc closes it (touch hover is suppressed so a synthesized hover can't keep
 * the popover stuck open after an outside tap).
 *
 * This is the standalone (single, non-grouped) listing. A tabbed group of
 * snippets uses the same interactive core (useAnnotatedCode, NotesRail,
 * AnnotationPopover) directly from CodeGroupClient instead of this component,
 * because a group needs ONE shared code panel + notes rail that swaps content
 * per tab, not one fully independent instance of this figure per tab.
 */
const AnnotatedListing = ({ html, filename, source, annotations }: Props) => {
  const { codeRef, wrapRef, innerHtml, isWide, activeId, pinnedId, popId, popPos, byId, setHoverId, togglePinnedId, CARD_WIDTH } =
    useAnnotatedCode(html, annotations);

  const popNote = byId(popId);

  return (
    <figure className='my-10 min-w-0'>
      <div className={LISTING_GRID}>
        <div ref={wrapRef} className='relative min-w-0'>
          <figcaption className='flex items-baseline justify-between gap-4 min-w-0 border border-b-0 border-rule bg-paper-raised px-4 py-2.5'>
            <span className='font-mono text-[0.75rem] text-ink-soft truncate'>{filename}</span>
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
            ref={codeRef}
            data-nosnippet
            className='border border-rule'
            dangerouslySetInnerHTML={innerHtml}
          />

          {!isWide && popPos && popNote && (
            <AnnotationPopover note={popNote} pos={popPos} cardWidth={CARD_WIDTH} />
          )}
        </div>

        <NotesRail
          annotations={annotations}
          activeId={activeId}
          pinnedId={pinnedId}
          onHover={setHoverId}
          onPin={togglePinnedId}
        />
      </div>
    </figure>
  );
};

export default AnnotatedListing;

'use client';

import { useRef, useState, KeyboardEvent } from 'react';
import type { CodeAnnotation } from '@/lib/annotations';
import { useAnnotatedCode } from './useAnnotatedCode';
import NotesRail, { LISTING_GRID } from './NotesRail';
import AnnotationPopover from './AnnotationPopover';

type Panel = {
  filename: string;
  source?: string | null;
  html: string;
  annotations: CodeAnnotation[];
};

const pathSuffix = (path: string, segments: number) =>
  path.split('/').slice(-segments).join('/');

/**
 * Tab labels are the shortest path suffix that tells each file apart from its
 * siblings — usually just the basename. Authored filenames are full repo
 * paths (that provenance is the point, and the standalone listing shows it),
 * but as tab labels they'd wrap the strip onto multiple rows; the full path
 * stays available on each tab as its tooltip. When two files in a group share
 * a basename, parent segments are added until the labels differ.
 */
const tabLabels = (filenames: string[]): string[] =>
  filenames.map((name, i) => {
    const depth = name.split('/').length;
    for (let segments = 1; segments <= depth; segments++) {
      const candidate = pathSuffix(name, segments);
      const unique = filenames.every(
        (other, j) => j === i || pathSuffix(other, segments) !== candidate
      );
      if (unique) return candidate;
    }
    return name;
  });

/**
 * Ledger snippet group: a tab strip of filenames on the paper-raised surface,
 * with a view-source link for the active file. Highlighting happens server-
 * side in CodeGroup; this only switches which panel's html/annotations are
 * shown.
 *
 * There is exactly one code panel and one notes rail on screen at a time,
 * shared across tabs via useAnnotatedCode rather than one independent panel +
 * rail mounted per tab. That matters for two things a per-tab-mount design
 * got wrong: the notes rail used to render *inside* the tab strip's shared
 * bordered box (that box was only ever meant to wrap bare code), trapping it
 * behind the same border as the code instead of sitting beside it as its own
 * unbordered, sticky column; and mounting every tab's listing simultaneously
 * (just toggling `hidden`) meant every tab's independent hover/pin state and
 * global document listeners were live at once, even for tabs you couldn't see.
 */
const CodeGroupClient = ({
  id,
  title,
  panels,
}: {
  id: string;
  title?: string;
  panels: Panel[];
}) => {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activePanel = panels[active];
  // Scoped to the active panel only, and gates just the rail/popover — never
  // the grid. The LISTING_GRID column is reserved on every tab, so switching
  // between an annotated and a plain tab swaps the rail's contents without
  // reflowing the code column (or the tab strip above it); a plain tab shows
  // no rail at all rather than an empty "Notes" header.
  const hasAnnotations = (activePanel?.annotations.length ?? 0) > 0;

  const { codeRef, wrapRef, innerHtml, isWide, activeId, pinnedId, popId, popPos, byId, setHoverId, togglePinnedId, CARD_WIDTH } =
    useAnnotatedCode(activePanel?.html ?? '', activePanel?.annotations ?? []);

  const popNote = byId(popId);

  // Roving keyboard navigation for tabs
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let newIndex = active;
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        newIndex = (active + 1) % panels.length;
        break;
      case 'ArrowLeft':
        e.preventDefault();
        newIndex = (active - 1 + panels.length) % panels.length;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = panels.length - 1;
        break;
      default:
        return;
    }
    setActive(newIndex);
    tabRefs.current[newIndex]?.focus();
  };

  const panelId = `${id}-panel`;
  const labels = tabLabels(panels.map((p) => p.filename));

  // The tablist never wraps: with suffix labels a strip of 2-3 tabs fits on
  // one line, and a pathological overflow scrolls sideways (same affordance
  // as the code itself) rather than stacking rows and changing the strip's
  // height between tabs.
  const tabStrip = (
    <div className='flex items-stretch justify-between gap-2 min-w-0 border border-b-0 border-rule bg-paper-raised'>
      <div role='tablist' className='flex min-w-0 overflow-x-auto'>
        {panels.map((panel, i) => {
          const isActive = i === active;
          const tabId = `${id}-tab-${i}`;
          return (
            <button
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              key={panel.filename + i}
              id={tabId}
              type='button'
              role='tab'
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              title={panel.filename}
              onClick={() => setActive(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={`cursor-pointer shrink-0 whitespace-nowrap border-r border-rule px-4 py-2.5 font-mono text-[0.72rem] transition-colors duration-200 ${
                isActive ? 'bg-ink text-paper' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {labels[i]}
            </button>
          );
        })}
      </div>
      {activePanel?.source && (
        <a
          href={activePanel.source}
          target='_blank'
          rel='noreferrer noopener'
          className='link-underline shrink-0 self-center whitespace-nowrap px-4 font-mono text-[0.7rem] text-mark'
        >
          view source
        </a>
      )}
    </div>
  );

  const codeBox = (
    <div ref={wrapRef} className='relative min-w-0'>
      {tabStrip}
      <div
        ref={codeRef}
        id={panelId}
        role='tabpanel'
        aria-labelledby={`${id}-tab-${active}`}
        data-nosnippet
        className='border border-rule'
        dangerouslySetInnerHTML={innerHtml}
      />
      {hasAnnotations && !isWide && popPos && popNote && (
        <AnnotationPopover note={popNote} pos={popPos} cardWidth={CARD_WIDTH} />
      )}
    </div>
  );

  return (
    <figure id={id} className='my-10 scroll-m-16 min-w-0'>
      {title && (
        <p className='mb-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-faint'>
          {title}
        </p>
      )}

      <div className={LISTING_GRID}>
        {codeBox}
        {hasAnnotations && (
          <NotesRail
            annotations={activePanel?.annotations ?? []}
            activeId={activeId}
            pinnedId={pinnedId}
            onHover={setHoverId}
            onPin={togglePinnedId}
          />
        )}
      </div>
    </figure>
  );
};

export default CodeGroupClient;

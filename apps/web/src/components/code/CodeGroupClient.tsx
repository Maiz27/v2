'use client';

import { useRef, useState, KeyboardEvent } from 'react';
import type { CodeAnnotation } from '@/lib/annotations';
import { useAnnotatedCode } from './useAnnotatedCode';
import NotesRail from './NotesRail';
import AnnotationPopover from './AnnotationPopover';

type Panel = {
  filename: string;
  source?: string | null;
  html: string;
  annotations: CodeAnnotation[];
};

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
  const hasAnnotations = panels.some((p) => p.annotations.length > 0);

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

  const tabStrip = (
    <div className='flex flex-wrap items-stretch justify-between gap-2 min-w-0 border border-b-0 border-rule bg-paper-raised'>
      <div role='tablist' className='flex flex-wrap min-w-0'>
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
              onClick={() => setActive(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={`cursor-pointer border-r border-rule px-4 py-2.5 font-mono text-[0.72rem] transition-colors duration-200 min-w-0 ${
                isActive ? 'bg-ink text-paper' : 'text-ink-soft hover:text-ink'
              }`}
            >
              <span className='truncate'>{panel.filename}</span>
            </button>
          );
        })}
      </div>
      {activePanel?.source && (
        <a
          href={activePanel.source}
          target='_blank'
          rel='noreferrer noopener'
          className='link-underline self-center px-4 font-mono text-[0.7rem] text-mark'
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

      {hasAnnotations ? (
        <div className='xl:grid xl:grid-cols-[minmax(0,1fr)_15rem] xl:gap-8'>
          {codeBox}
          <NotesRail
            annotations={activePanel?.annotations ?? []}
            activeId={activeId}
            pinnedId={pinnedId}
            onHover={setHoverId}
            onPin={togglePinnedId}
          />
        </div>
      ) : (
        codeBox
      )}
    </figure>
  );
};

export default CodeGroupClient;

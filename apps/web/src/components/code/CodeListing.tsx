'use client';

import {
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { AnnotationKind, CodeAnnotation } from '@/lib/annotations';
import type { CodeListingPanel } from './panelize';
import {
  type PanelSelection,
  selectedIdForPanel,
  toggledPanelSelection,
} from './panelSelection';
import { tabLabels } from './tabLabels';

const CARD_WIDTH = 288;
const LISTING_GRID = 'xl:grid xl:grid-cols-[minmax(0,1fr)_13rem] xl:gap-6';

export type CodeListingHeader =
  | { kind: 'caption' }
  | { kind: 'tabs'; title?: string };

export type CodeListingProps = {
  id: string;
  panels: CodeListingPanel[];
  header: CodeListingHeader;
  className?: string;
};

type ListingState = {
  codeRef: React.RefObject<HTMLDivElement | null>;
  wrapRef: React.RefObject<HTMLDivElement | null>;
  innerHtml: { __html: string };
  isWide: boolean;
  activeId: string | null;
  pinnedId: string | null;
  popId: string | null;
  popPos: { x: number; y: number } | null;
  setHoverId: (id: string | null) => void;
  togglePinnedId: (id: string) => void;
};

function useListingState(panel: CodeListingPanel): ListingState {
  const { panelKey, html, annotations } = panel;
  const codeRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isWide, setIsWide] = useState(true);
  const [hoverSelection, setHoverSelection] = useState<PanelSelection>(null);
  const [pinnedSelection, setPinnedSelection] = useState<PanelSelection>(null);
  const [popPos, setPopPos] = useState<{ x: number; y: number } | null>(null);

  // React 19 reassigns innerHTML when this wrapper gets a new identity. Keep
  // it stable so hover and pin renders do not rebuild the Shiki token spans.
  const innerHtml = useMemo(() => ({ __html: html }), [html]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1280px)');
    const apply = () => setIsWide(media.matches);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  // A panel key, rather than the large Shiki HTML string, scopes selections.
  // Tabs may reuse annotation ids and may even render identical HTML.
  const hoverId = selectedIdForPanel(hoverSelection, panelKey, annotations);
  const pinnedId = selectedIdForPanel(pinnedSelection, panelKey, annotations);
  const activeId = pinnedId ?? hoverId;
  const popId = isWide ? null : activeId;

  const togglePinnedId = useCallback(
    (id: string) => {
      setPinnedSelection((current) =>
        toggledPanelSelection(current, id, panelKey, annotations)
      );
    },
    [annotations, panelKey]
  );

  const setHoverId = useCallback(
    (id: string | null) =>
      setHoverSelection(id === null ? null : { id, panelKey }),
    [panelKey]
  );

  const togglePin = useCallback(
    (element: Element) => {
      const id = element.getAttribute('data-annot');
      if (id) togglePinnedId(id);
    },
    [togglePinnedId]
  );

  // Shiki owns the token markup, so pointer and keyboard events are delegated
  // from the code root. Touch uses pointerdown/up to distinguish taps from a
  // horizontal scroll; synthesized touch hover is ignored.
  useEffect(() => {
    const root = codeRef.current;
    if (!root) return;

    const annotationAtTarget = (event: Event) =>
      event.target instanceof Element
        ? event.target.closest('[data-annot]')
        : null;

    const over = (event: Event) => {
      if (event instanceof PointerEvent && event.pointerType === 'touch') return;
      const annotation = annotationAtTarget(event);
      const id = annotation?.getAttribute('data-annot');
      if (id) setHoverId(id);
    };
    const out = (event: Event) => {
      if (event instanceof PointerEvent && event.pointerType === 'touch') return;
      if (annotationAtTarget(event)) setHoverId(null);
    };

    let pointerStart: {
      id: string;
      x: number;
      y: number;
      time: number;
    } | null = null;
    const pointerDown = (event: PointerEvent) => {
      const annotation = annotationAtTarget(event);
      const id = annotation?.getAttribute('data-annot');
      pointerStart = id
        ? { id, x: event.clientX, y: event.clientY, time: Date.now() }
        : null;
    };
    const pointerUp = (event: PointerEvent) => {
      if (!pointerStart) return;
      const { id, x, y, time } = pointerStart;
      pointerStart = null;
      const annotation = annotationAtTarget(event);
      if (!annotation || annotation.getAttribute('data-annot') !== id) return;
      const moved = Math.hypot(event.clientX - x, event.clientY - y);
      if (moved < 10 && Date.now() - time < 500) togglePin(annotation);
    };
    const key = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const annotation = annotationAtTarget(event);
      if (!annotation) return;
      event.preventDefault();
      togglePin(annotation);
    };

    root.addEventListener('pointerover', over);
    root.addEventListener('pointerout', out);
    root.addEventListener('focusin', over);
    root.addEventListener('focusout', out);
    root.addEventListener('pointerdown', pointerDown);
    root.addEventListener('pointerup', pointerUp);
    root.addEventListener('keydown', key);
    return () => {
      root.removeEventListener('pointerover', over);
      root.removeEventListener('pointerout', out);
      root.removeEventListener('focusin', over);
      root.removeEventListener('focusout', out);
      root.removeEventListener('pointerdown', pointerDown);
      root.removeEventListener('pointerup', pointerUp);
      root.removeEventListener('keydown', key);
    };
  }, [panelKey, setHoverId, togglePin]);

  // Escape releases all state. A pointerdown outside an annotation or notes
  // control releases the pin before the next interaction begins.
  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPinnedSelection(null);
        setHoverSelection(null);
      }
    };
    const onDown = (event: Event) => {
      if (
        event.target instanceof Element &&
        event.target.closest('[data-annot], [data-annot-control]')
      ) {
        return;
      }
      setPinnedSelection(null);
      setHoverSelection(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, []);

  // Recalculate the below-xl popover when its token, scroller, or wrapping
  // layout moves. The animation-frame gate keeps scroll handling bounded.
  useEffect(() => {
    let frame: number | null = null;
    const recalculate = () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        frame = null;
        if (isWide || !popId) {
          setPopPos(null);
          return;
        }
        const wrap = wrapRef.current;
        const code = codeRef.current;
        if (!wrap || !code) {
          setPopPos(null);
          return;
        }
        const token = [...code.querySelectorAll('[data-annot]')].find(
          (element) => element.getAttribute('data-annot') === popId
        );
        if (!token) {
          setPopPos(null);
          return;
        }
        const wrapRect = wrap.getBoundingClientRect();
        const tokenRect = token.getBoundingClientRect();
        const maxX = Math.max(8, wrapRect.width - CARD_WIDTH - 8);
        setPopPos({
          x: Math.min(Math.max(tokenRect.left - wrapRect.left, 8), maxX),
          y: tokenRect.bottom - wrapRect.top + 10,
        });
      });
    };

    recalculate();
    const scroller = codeRef.current?.querySelector('.shiki') ?? codeRef.current;
    scroller?.addEventListener('scroll', recalculate, { passive: true });
    window.addEventListener('resize', recalculate);
    const wrap = wrapRef.current;
    const resizeObserver = wrap ? new ResizeObserver(recalculate) : null;
    if (wrap && resizeObserver) resizeObserver.observe(wrap);

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      scroller?.removeEventListener('scroll', recalculate);
      window.removeEventListener('resize', recalculate);
      resizeObserver?.disconnect();
    };
  }, [isWide, panelKey, popId]);

  // Keep the existing CSS contract on the highlighted annotation spans.
  useEffect(() => {
    const root = codeRef.current;
    if (!root) return;
    root.querySelectorAll('[data-annot]').forEach((element) => {
      const id = element.getAttribute('data-annot');
      element.toggleAttribute('data-active', id === activeId);
      element.toggleAttribute('data-pinned', id === pinnedId);
    });
  }, [activeId, panelKey, pinnedId]);

  return {
    codeRef,
    wrapRef,
    innerHtml,
    isWide,
    activeId,
    pinnedId,
    popId,
    popPos,
    setHoverId,
    togglePinnedId,
  };
}

const kindLabel = (kind: AnnotationKind) =>
  kind === 'decision' ? 'Decision' : 'Context';

type NotesRailProps = {
  annotations: CodeAnnotation[];
  activeId: string | null;
  pinnedId: string | null;
  onHover: (id: string | null) => void;
  onPin: (id: string) => void;
};

function NotesRail({
  annotations,
  activeId,
  pinnedId,
  onHover,
  onPin,
}: NotesRailProps) {
  return (
    <aside className='mt-5 hidden xl:sticky xl:top-10 xl:mt-0 xl:block xl:max-h-[calc(100vh-5rem)] xl:self-start xl:overflow-y-auto'>
      <p className='mb-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-faint'>
        Notes
      </p>
      <ol className='space-y-4 xl:space-y-5'>
        {annotations.map((annotation, index) => {
          const isActive = annotation.id === activeId;
          const isPinned = annotation.id === pinnedId;
          return (
            <li
              key={annotation.id}
              className={`group grid grid-cols-[1.4rem_minmax(0,1fr)] gap-x-1 text-[0.8rem] leading-relaxed transition-colors duration-200 ${
                isActive ? 'text-ink' : 'text-ink-soft'
              }`}
            >
              <span className='font-mono text-[0.7rem] font-bold text-mark'>
                {index + 1}
              </span>
              <span>
                <button
                  type='button'
                  data-annot-control
                  onPointerEnter={(event) => {
                    if (event.pointerType !== 'touch') onHover(annotation.id);
                  }}
                  onPointerLeave={(event) => {
                    if (event.pointerType !== 'touch') onHover(null);
                  }}
                  onClick={() => onPin(annotation.id)}
                  className={`focus:outline-hidden focus-visible:ring-2 focus-visible:ring-mark focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
                    isPinned ? 'font-medium' : ''
                  }`}
                >
                  <span
                    className={`mb-1 block font-mono text-[0.62rem] uppercase tracking-[0.14em] ${
                      annotation.kind === 'decision'
                        ? 'text-mark'
                        : 'text-ink-faint'
                    }`}
                  >
                    {kindLabel(annotation.kind)}
                    {isPinned && (
                      <span className='ml-1.5 normal-case tracking-normal text-ink-faint'>
                        &middot; pinned
                      </span>
                    )}
                  </span>
                  {annotation.body}
                </button>
              </span>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}

function AnnotationPopover({
  note,
  position,
}: {
  note: CodeAnnotation;
  position: { x: number; y: number };
}) {
  return (
    <aside
      key={note.id}
      role='note'
      style={{ left: position.x, top: position.y, width: CARD_WIDTH }}
      className='ledger-pop absolute z-10 max-w-[calc(100%-1rem)] border border-rule bg-paper-raised px-4 py-3.5'
    >
      <p
        className={`mb-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] ${
          note.kind === 'decision' ? 'text-mark' : 'text-ink-faint'
        }`}
      >
        {kindLabel(note.kind)}
        <span className='ml-2 normal-case tracking-normal text-ink-faint'>
          Esc to close
        </span>
      </p>
      <p className='text-[0.85rem] leading-relaxed text-ink-soft'>{note.body}</p>
    </aside>
  );
}

function ListingPanel({
  panel,
  header,
  panelId,
  labelledBy,
}: {
  panel: CodeListingPanel;
  header: ReactNode;
  panelId?: string;
  labelledBy?: string;
}) {
  const {
    codeRef,
    wrapRef,
    innerHtml,
    isWide,
    activeId,
    pinnedId,
    popId,
    popPos,
    setHoverId,
    togglePinnedId,
  } = useListingState(panel);
  const hasAnnotations = panel.annotations.length > 0;
  const popNote = panel.annotations.find(
    (annotation) => annotation.id === popId
  );

  return (
    <div className={LISTING_GRID}>
      <div ref={wrapRef} className='relative min-w-0'>
        {header}
        <div
          ref={codeRef}
          id={panelId}
          role={panelId ? 'tabpanel' : undefined}
          aria-labelledby={labelledBy}
          data-nosnippet
          className='border border-rule'
          dangerouslySetInnerHTML={innerHtml}
        />
        {hasAnnotations && !isWide && popPos && popNote && (
          <AnnotationPopover note={popNote} position={popPos} />
        )}
      </div>

      {hasAnnotations && (
        <NotesRail
          annotations={panel.annotations}
          activeId={activeId}
          pinnedId={pinnedId}
          onHover={setHoverId}
          onPin={togglePinnedId}
        />
      )}
    </div>
  );
}

/**
 * One client owner for standalone and tabbed Ledger code listings, including
 * tabs, token interaction, margin notes, and the responsive popover.
 */
export default function CodeListing({
  id,
  panels,
  header,
  className,
}: CodeListingProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pendingTabFocus = useRef<number | null>(null);
  const activePanel = panels[activeIndex] ?? panels[0];

  useEffect(() => {
    const nextIndex = pendingTabFocus.current;
    if (nextIndex === null) return;
    tabRefs.current[nextIndex]?.focus();
    pendingTabFocus.current = null;
  }, [activeIndex]);

  if (!activePanel) return null;

  const labels = tabLabels(panels.map((panel) => panel.filename));
  const isTabbed = header.kind === 'tabs';
  const panelId = isTabbed ? `${id}-panel` : undefined;
  const activeTabId = isTabbed ? `${id}-tab-${activeIndex}` : undefined;

  const selectFromKeyboard = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIndex = index;
    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % panels.length;
        break;
      case 'ArrowLeft':
        nextIndex = (index - 1 + panels.length) % panels.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = panels.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    if (nextIndex === activeIndex) {
      pendingTabFocus.current = null;
      return;
    }
    pendingTabFocus.current = nextIndex;
    setActiveIndex(nextIndex);
  };

  const headerNode = isTabbed ? (
    <div className='flex items-stretch justify-between gap-2 min-w-0 border border-b-0 border-rule-strong bg-paper-raised'>
      <div role='tablist' className='flex min-w-0 overflow-x-auto'>
        {panels.map((panel, index) => {
          const isActive = index === activeIndex;
          const tabId = `${id}-tab-${index}`;
          return (
            <button
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              key={panel.panelKey}
              id={tabId}
              type='button'
              role='tab'
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              title={panel.filename}
              onClick={() => {
                pendingTabFocus.current = index === activeIndex ? null : index;
                setActiveIndex(index);
              }}
              onKeyDown={(event) => selectFromKeyboard(event, index)}
              className={`cursor-pointer shrink-0 whitespace-nowrap border-r border-rule-strong px-4 py-2.5 font-mono text-[0.72rem] transition-colors duration-200 ${
                isActive ? 'bg-ink text-paper' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {labels[index]}
            </button>
          );
        })}
      </div>
      {activePanel.source && (
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
  ) : (
    <figcaption className='flex items-baseline justify-between gap-4 min-w-0 border border-b-0 border-rule bg-paper-raised px-4 py-2.5'>
      <span className='font-mono text-[0.75rem] text-ink-soft truncate'>
        {activePanel.filename}
      </span>
      {activePanel.source && (
        <a
          href={activePanel.source}
          target='_blank'
          rel='noreferrer noopener'
          className='link-underline shrink-0 font-mono text-[0.7rem] text-mark'
        >
          view source
        </a>
      )}
    </figcaption>
  );

  return (
    <figure
      id={id}
      className={`my-10 scroll-m-16 min-w-0 ${className ?? ''}`}
    >
      {header.kind === 'tabs' && header.title && (
        <p className='mb-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-faint'>
          {header.title}
        </p>
      )}
      <ListingPanel
        key={activePanel.panelKey}
        panel={activePanel}
        header={headerNode}
        panelId={panelId}
        labelledBy={activeTabId}
      />
    </figure>
  );
}

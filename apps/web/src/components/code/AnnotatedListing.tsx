'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { AnnotationKind, CodeAnnotation } from '@/lib/annotations';

type Props = {
  html: string;
  filename: string;
  source?: string | null;
  annotations: CodeAnnotation[];
  isGroup?: boolean;
};

const CARD_WIDTH = 288;

const kindLabel = (kind: AnnotationKind) =>
  kind === 'decision' ? 'Decision' : 'Context';

/**
 * The Ledger listing reads like a printed page. On xl+ the annotations sit
 * beside it as numbered margin notes: hovering a proof mark lights its note,
 * clicking a mark pins it so the note stays lit while you scan the code (click
 * again or Esc to release). Below xl the margin does not fit, so hovering a
 * mark (pointer devices) opens a small popover at the token, and clicking pins
 * it open; tap works the same on touch (tap opens/pins, tap again closes).
 *
 * The below-xl popover position is derived from the active token in a layout
 * effect rather than only at click time, so it can never miss the token or race
 * the outside-close handler (fix #10). Tokens are keyboard-reachable; Enter /
 * Space pin, Esc closes.
 */
const AnnotatedListing = ({
  html,
  filename,
  source,
  annotations,
  isGroup,
}: Props) => {
  const codeRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const [isWide, setIsWide] = useState(true);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [popPos, setPopPos] = useState<{ x: number; y: number } | null>(null);

  const byId = useCallback(
    (id: string | null) => annotations.find((a) => a.id === id) ?? null,
    [annotations]
  );

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1280px)');
    const apply = () => setIsWide(media.matches);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  // A pin wins over a passing hover, in both layouts.
  const activeId = pinnedId ?? hoverId;
  // Below xl the popover follows the same active id.
  const popId = isWide ? null : activeId;

  // Toggle pin on a mark (click / Enter / Space).
  const togglePin = useCallback((el: Element) => {
    const id = el.getAttribute('data-annot');
    if (!id) return;
    setPinnedId((current) => (current === id ? null : id));
  }, []);

  // Delegated pointer / keyboard interaction on the code block (tokens live
  // inside dangerouslySetInnerHTML, so listeners are delegated from the root).
  useEffect(() => {
    const root = codeRef.current;
    if (!root) return;

    const over = (e: Event) => {
      const t = (e.target as HTMLElement).closest('[data-annot]');
      if (t) setHoverId(t.getAttribute('data-annot'));
    };
    const out = (e: Event) => {
      const t = (e.target as HTMLElement).closest('[data-annot]');
      if (t) setHoverId(null);
    };

    // Tap/click-to-pin via pointerdown+pointerup rather than a native click.
    // The code block scrolls horizontally (overflow-x: auto), and inside a
    // scrollable region mobile browsers can suppress the synthetic click for a
    // stationary tap while still firing pointer events, silently eating taps.
    // Pointer events aren't subject to that suppression, so we detect a tap
    // ourselves: pointerdown and pointerup on the same mark, close together in
    // both time and position.
    let pointerStart: { id: string; x: number; y: number; time: number } | null =
      null;
    const pointerDown = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest('[data-annot]');
      pointerStart = t
        ? {
            id: t.getAttribute('data-annot')!,
            x: e.clientX,
            y: e.clientY,
            time: Date.now(),
          }
        : null;
    };
    const pointerUp = (e: PointerEvent) => {
      if (!pointerStart) return;
      const { id, x, y, time } = pointerStart;
      pointerStart = null;
      const t = (e.target as HTMLElement).closest('[data-annot]');
      if (!t || t.getAttribute('data-annot') !== id) return;
      const moved = Math.hypot(e.clientX - x, e.clientY - y);
      if (moved < 10 && Date.now() - time < 500) togglePin(t);
    };

    const key = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const t = (e.target as HTMLElement).closest('[data-annot]');
      if (t) {
        e.preventDefault();
        togglePin(t);
      }
    };

    root.addEventListener('mouseover', over);
    root.addEventListener('mouseout', out);
    root.addEventListener('focusin', over);
    root.addEventListener('focusout', out);
    root.addEventListener('pointerdown', pointerDown);
    root.addEventListener('pointerup', pointerUp);
    root.addEventListener('keydown', key);
    return () => {
      root.removeEventListener('mouseover', over);
      root.removeEventListener('mouseout', out);
      root.removeEventListener('focusin', over);
      root.removeEventListener('focusout', out);
      root.removeEventListener('pointerdown', pointerDown);
      root.removeEventListener('pointerup', pointerUp);
      root.removeEventListener('keydown', key);
    };
  }, [togglePin]);

  // Esc releases everything; a pointerdown outside the figure releases the pin.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPinnedId(null);
        setHoverId(null);
      }
    };
    const onDown = (e: Event) => {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setPinnedId(null);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, []);

  // Derive the below-xl popover position from the active token, so it always
  // lands under the token and survives re-renders and scroll-into-view.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (isWide || !popId) {
        setPopPos(null);
        return;
      }
      const wrap = wrapRef.current;
      const token = codeRef.current?.querySelector(`[data-annot="${popId}"]`);
      if (!wrap || !token) {
        setPopPos(null);
        return;
      }
      const wrapRect = wrap.getBoundingClientRect();
      const rect = token.getBoundingClientRect();
      const maxX = Math.max(8, wrapRect.width - CARD_WIDTH - 8);
      setPopPos({
        x: Math.min(Math.max(rect.left - wrapRect.left, 8), maxX),
        y: rect.bottom - wrapRect.top + 10,
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isWide, popId, html]);

  // Reflect active / pinned state on the tokens in the highlighted markup.
  useEffect(() => {
    const root = codeRef.current;
    if (!root) return;
    root.querySelectorAll('[data-annot]').forEach((el) => {
      const id = el.getAttribute('data-annot');
      el.toggleAttribute('data-active', id === activeId);
      el.toggleAttribute('data-pinned', id === pinnedId);
    });
  }, [activeId, pinnedId]);

  const popNote = byId(popId);

  return (
    <figure className={isGroup ? '' : 'my-10'}>
      <div className='xl:grid xl:grid-cols-[minmax(0,1fr)_15rem] xl:gap-8'>
        <div ref={wrapRef} className='relative min-w-0'>
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
            ref={codeRef}
            data-nosnippet
            className={isGroup ? '' : 'border border-rule'}
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Below-xl popover, anchored at the active token, clamped to the block. */}
          {!isWide && popPos && popNote && (
            <aside
              key={popNote.id}
              role='note'
              style={{ left: popPos.x, top: popPos.y, width: CARD_WIDTH }}
              className='ledger-pop absolute z-10 max-w-[calc(100%-1rem)] border border-rule bg-paper-raised px-4 py-3.5'
            >
              <p
                className={`mb-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] ${
                  popNote.kind === 'decision' ? 'text-mark' : 'text-ink-faint'
                }`}
              >
                {kindLabel(popNote.kind)}
                <span className='ml-2 normal-case tracking-normal text-ink-faint'>
                  Esc to close
                </span>
              </p>
              <p className='text-[0.85rem] leading-relaxed text-ink-soft'>
                {popNote.body}
              </p>
            </aside>
          )}
        </div>

        {/* Margin notes (xl+ only). */}
        <aside className='mt-5 hidden xl:mt-0 xl:block'>
          <p className='mb-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-faint'>
            Notes
          </p>
          <ol className='space-y-4 xl:space-y-5'>
            {annotations.map((a, i) => {
              const isActive = a.id === activeId;
              const isPinned = a.id === pinnedId;
              return (
                <li
                  key={a.id}
                  onMouseEnter={() => setHoverId(a.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onClick={() =>
                    setPinnedId((current) => (current === a.id ? null : a.id))
                  }
                  className={`group grid cursor-pointer grid-cols-[1.4rem_minmax(0,1fr)] gap-x-1 text-[0.8rem] leading-relaxed transition-colors duration-200 ${
                    isActive ? 'text-ink' : 'text-ink-soft'
                  }`}
                >
                  <span className='font-mono text-[0.7rem] font-bold text-mark'>
                    {i + 1}
                  </span>
                  <span>
                    <span
                      className={`mr-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] ${
                        a.kind === 'decision' ? 'text-mark' : 'text-ink-faint'
                      }`}
                    >
                      {kindLabel(a.kind)}
                    </span>
                    {a.body}
                    {isPinned && (
                      <span className='ml-1.5 align-middle font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ink-faint'>
                        [pinned]
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
        </aside>
      </div>
    </figure>
  );
};

export default AnnotatedListing;

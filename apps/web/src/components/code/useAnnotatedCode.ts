import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CodeAnnotation } from '@/lib/annotations';

const CARD_WIDTH = 288;

/**
 * Interactive state + DOM wiring shared by every annotated code listing:
 * hover/pin a `[data-annot]` mark, derive the below-xl popover position, and
 * reflect active/pinned state back onto the tokens. Lives in a hook (rather
 * than solely inside AnnotatedListing) so a tabbed group can drive one shared
 * code panel + notes rail from a single instance, keyed to whichever tab is
 * active — instead of each tab mounting its own fully independent listing.
 *
 * `html` is a dependency, not just an id: when the caller swaps which code is
 * displayed (a tab switch) without remounting the hook, every effect keyed on
 * `html` re-resolves against the new tokens.
 */
export function useAnnotatedCode(html: string, annotations: CodeAnnotation[]) {
  const codeRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const [isWide, setIsWide] = useState(true);
  const [hoverIdRaw, setHoverId] = useState<string | null>(null);
  const [pinnedIdRaw, setPinnedIdRaw] = useState<string | null>(null);
  const [popPos, setPopPos] = useState<{ x: number; y: number } | null>(null);

  const byId = useCallback(
    (id: string | null) => annotations.find((a) => a.id === id) ?? null,
    [annotations]
  );

  // The dangerouslySetInnerHTML value MUST be identity-stable across renders:
  // React 19 re-assigns innerHTML whenever the wrapper object is a new
  // reference, even if `__html` is the same string. An inline `{ __html }`
  // literal therefore rebuilds every token span on every hover/pin re-render,
  // silently discarding the data-active/data-pinned attributes the reflect
  // effect set — the effect can't repair them because its own deps haven't
  // changed. (It also re-parses the whole highlighted block per re-render.)
  const innerHtml = useMemo(() => ({ __html: html }), [html]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1280px)');
    const apply = () => setIsWide(media.matches);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  // A hover/pin id left over from a previous tab's (or the previous html's)
  // annotations doesn't belong to what's on screen now. Rather than clearing
  // it with a setState-in-effect when `html` changes, it's simply not
  // recognized as active/pinned once it stops matching the current
  // annotations — the stale id goes inert on its own the moment the content
  // under it changes, no extra render needed.
  const hoverId =
    hoverIdRaw !== null && annotations.some((a) => a.id === hoverIdRaw) ? hoverIdRaw : null;
  const pinnedId =
    pinnedIdRaw !== null && annotations.some((a) => a.id === pinnedIdRaw) ? pinnedIdRaw : null;

  // A pin wins over a passing hover, in both layouts.
  const activeId = pinnedId ?? hoverId;
  // Below xl the popover follows the same active id.
  const popId = isWide ? null : activeId;

  // Toggle pin by annotation id, validated against the current pin the same
  // way reads are: a stale raw pin from another tab never gets treated as
  // "already pinned to this id", so clicking a same-named id in a new tab
  // pins it rather than instantly toggling it back off.
  const togglePinnedId = useCallback(
    (id: string) => {
      setPinnedIdRaw((current) => {
        const validCurrent =
          current !== null && annotations.some((a) => a.id === current) ? current : null;
        return validCurrent === id ? null : id;
      });
    },
    [annotations]
  );

  const togglePin = useCallback(
    (el: Element) => {
      const id = el.getAttribute('data-annot');
      if (id) togglePinnedId(id);
    },
    [togglePinnedId]
  );

  // Delegated pointer / keyboard interaction on the code block (tokens live
  // inside dangerouslySetInnerHTML, so listeners are delegated from the root).
  useEffect(() => {
    const root = codeRef.current;
    if (!root) return;

    // Hover is a pointer-device affordance only. Touch taps fire *synthesized*
    // mouse/pointer-over events, so if we honored them on touch the resulting
    // hoverId would outlive the tap and — since activeId falls back to hoverId —
    // keep the popover pinned open even after an outside tap cleared the real
    // pin. On touch the popover is driven solely by the pin (tap opens, tap
    // again / outside / Esc closes). Guard hover to genuine pointer devices.
    const over = (e: Event) => {
      if (e instanceof PointerEvent && e.pointerType === 'touch') return;
      const t = (e.target as HTMLElement).closest('[data-annot]');
      if (t) setHoverId(t.getAttribute('data-annot'));
    };
    const out = (e: Event) => {
      if (e instanceof PointerEvent && e.pointerType === 'touch') return;
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
    // Re-delegate against the new markup whenever the displayed code changes.
  }, [togglePin, html]);

  // Esc releases everything; a pointerdown anywhere that is not itself an
  // annotation mark releases the pin. Scoping this to "outside wrapRef" was too
  // narrow: wrapRef wraps the full-width code block, so on mobile a tap meant to
  // dismiss almost always lands on the code *inside* wrapRef and never closed
  // the popover — the whole reported bug. Tapping another mark is intentionally
  // exempt so the pointerup toggle can switch the pin to it instead.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPinnedIdRaw(null);
        setHoverId(null);
      }
    };
    const onDown = (e: Event) => {
      if ((e.target as HTMLElement).closest('[data-annot]')) return;
      setPinnedIdRaw(null);
      setHoverId(null);
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
      if (!wrap) {
        setPopPos(null);
        return;
      }
      const code = codeRef.current;
      if (!code) {
        setPopPos(null);
        return;
      }
      const tokens = code.querySelectorAll('[data-annot]');
      let token: Element | null = null;
      for (const t of tokens) {
        if (t.getAttribute('data-annot') === popId) {
          token = t;
          break;
        }
      }
      if (!token) {
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
  }, [activeId, pinnedId, html]);

  return {
    codeRef,
    wrapRef,
    innerHtml,
    isWide,
    activeId,
    pinnedId,
    popId,
    popPos,
    byId,
    setHoverId,
    togglePinnedId,
    CARD_WIDTH,
  };
}

'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { setRouteTransitionEntering } from './route-transition-flag';
import { INITIAL_MOTION_STATE } from '@/lib/motion';

/**
 * Ledger route transition. A paper panel slides up over the page with a 2px
 * oxide-red hairline on its leading edge; at full cover the destination rises
 * through a line mask (mono eyebrow + Besley label) as a red rule draws
 * beneath. Navigation commits under cover; the rule becomes an indeterminate
 * sweep while the route renders; the panel then lifts up off the incoming page.
 *
 * Logic reused from the Nilotik reference (document-level click interception,
 * idle -> covering -> waiting -> revealing, router.push under cover, pathname
 * effect triggers the reveal, ~7s watchdog, scroll-to-top on reveal). Navigation
 * waits for the panel animation and two painted frames, then reveal gets the same
 * paint boundary after the destination commits. The stack is WAAPI, not gsap.
 * When the motion gate resolves off, links are never intercepted and navigation
 * is native.
 *
 * Two more entry points into the same phase machine:
 * - Browser back/forward (popstate): the URL has already changed by the time
 *   popstate fires, so there is nothing to cover-then-commit the way a click
 *   does. Instead the curtain snaps straight to "fully covering" (no slide-up)
 *   and waits for the destination to land, same as the tail end of a click nav.
 * - Landing on the site fresh (a hard navigation, not a client-side one): the
 *   root's initial render is server-rendered already in the covering state
 *   (see startCovered below) so there is no flash of the raw page before JS
 *   runs, then it holds briefly and reveals once mounted.
 */

type Phase = 'idle' | 'covering' | 'waiting' | 'revealing';

type Destination = { eyebrow: string; label: string };

const COVER_MS = 560;
const REVEAL_MS = 620;
const WATCHDOG_MS = 7000;
const ARRIVAL_HOLD_MS = 380;
const EASE_INOUT = 'cubic-bezier(0.65, 0, 0.35, 1)';
const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
const EASE_IN = 'cubic-bezier(0.5, 0, 0.75, 0)';

function destinationForPath(pathname: string): Destination {
  if (pathname === '/') return { eyebrow: 'Index', label: 'The work' };
  if (pathname === '/cv')
    return { eyebrow: 'Curriculum vitae', label: 'Maged Faiz' };
  if (pathname === '/projects') return { eyebrow: 'Archive', label: 'Every project' };
  if (pathname.startsWith('/projects/'))
    return { eyebrow: 'Case study', label: 'The write-up' };
  return { eyebrow: 'Elsewhere', label: 'Loading' };
}

// Server-consistent (no browser APIs): whether the curtain's very first
// render, before any JS has run, should already be in the covering state so
// a fresh page load never flashes the raw page before the arrival reveal.
const startCovered = INITIAL_MOTION_STATE === 'on';

const RouteTransition = () => {
  const router = useRouter();
  const pathname = usePathname();
  // Captured once, from whatever pathname the very first render (SSR) saw.
  // pathname itself changes on every client-side nav and would otherwise
  // fight the imperative textContent writes in cover()/instantCover() below.
  const [initialDest] = useState<Destination>(() => destinationForPath(pathname));

  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);

  const phaseRef = useRef<Phase>('idle');
  const apiRef = useRef<{ reveal: () => void } | null>(null);
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const root = rootRef.current;
    const panel = panelRef.current;
    const eyebrow = eyebrowRef.current;
    const label = labelRef.current;
    const rule = ruleRef.current;
    if (!root || !panel || !eyebrow || !label || !rule) return;

    let running: Animation[] = [];
    let pulse: Animation | null = null;
    let watchdog: number | null = null;
    let commitFrame: number | null = null;
    let arrivalTimer: number | null = null;
    let popstatePoll: number | null = null;
    let scrollFrame: number | null = null;

    const clearTimers = () => {
      if (watchdog !== null) window.clearTimeout(watchdog);
      if (commitFrame !== null) window.cancelAnimationFrame(commitFrame);
      if (arrivalTimer !== null) window.clearTimeout(arrivalTimer);
      if (popstatePoll !== null) window.cancelAnimationFrame(popstatePoll);
      if (scrollFrame !== null) window.cancelAnimationFrame(scrollFrame);
      watchdog = null;
      commitFrame = null;
      arrivalTimer = null;
      popstatePoll = null;
      scrollFrame = null;
    };

    // Chromium silently downgrades `scroll-behavior: smooth` (and the
    // `behavior: 'smooth'` option on scrollTo/scrollIntoView) to an instant
    // jump whenever the OS reports prefers-reduced-motion, regardless of the
    // page's own CSS — a browser-internal accessibility override our motion
    // gate has no way to reach (see lib/motion.ts). On this machine that
    // downgrades every same-page anchor jump, so same-page hash links (TOC,
    // footnotes) animate the scroll manually instead of relying on native
    // fragment navigation.
    const smoothScrollToHash = (hash: string) => {
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      if (scrollFrame !== null) window.cancelAnimationFrame(scrollFrame);

      const startY = window.scrollY;
      const scrollMarginTop =
        parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      const destY = Math.max(
        0,
        startY + target.getBoundingClientRect().top - scrollMarginTop
      );
      const distance = destY - startY;
      if (Math.abs(distance) < 1) {
        history.pushState(null, '', hash);
        return;
      }

      const duration = Math.min(900, Math.max(320, Math.abs(distance) * 0.5));
      const start = performance.now();
      const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        window.scrollTo(0, startY + distance * easeOutQuint(t));
        if (t < 1) {
          scrollFrame = window.requestAnimationFrame(step);
        } else {
          scrollFrame = null;
          history.pushState(null, '', hash);
        }
      };
      scrollFrame = window.requestAnimationFrame(step);
    };
    const cancelRunning = (preserveStyles = false) => {
      running.forEach((a) => {
        if (preserveStyles) a.commitStyles();
        a.cancel();
      });
      running = [];
    };
    const run = (
      el: Element,
      frames: Keyframe[],
      duration: number,
      opts: KeyframeAnimationOptions = {}
    ) => {
      const anim = el.animate(frames, {
        duration,
        easing: EASE_INOUT,
        fill: 'forwards',
        ...opts,
      });
      running.push(anim);
      return anim;
    };

    const finish = () => {
      phaseRef.current = 'idle';
      setRouteTransitionEntering(false);
      clearTimers();
      pulse?.cancel();
      pulse = null;
      cancelRunning();
      root.style.visibility = 'hidden';
      root.style.pointerEvents = 'none';
      // Reset panel to starting position (off-screen bottom) for next navigation
      panel.style.transform = 'translateY(100%)';
      // Reset text elements to starting position
      eyebrow.style.transform = 'translateY(180%)';
      label.style.transform = 'translateY(180%)';
      rule.style.transform = 'scaleX(0)';
    };

    const reveal = () => {
      if (phaseRef.current !== 'waiting' && phaseRef.current !== 'covering')
        return;
      phaseRef.current = 'revealing';
      pulse?.cancel();
      pulse = null;
      clearTimers();
      cancelRunning(true);
      window.scrollTo(0, 0);

      run(
        label,
        [{ transform: 'translateY(0)' }, { transform: 'translateY(-180%)' }],
        300,
        { easing: EASE_IN }
      );
      run(
        eyebrow,
        [{ transform: 'translateY(0)' }, { transform: 'translateY(-180%)' }],
        300,
        { easing: EASE_IN, delay: 40 }
      );
      run(rule, [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }], 260, {
        easing: EASE_IN,
      });
      const sweep = run(
        panel,
        [{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }],
        REVEAL_MS,
        { delay: 120 }
      );
      sweep.onfinish = finish;
    };

    const startPulse = () => {
      rule.style.transformOrigin = 'left center';
      pulse = rule.animate(
        [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.12)' }],
        {
          duration: 720,
          iterations: Infinity,
          direction: 'alternate',
          easing: 'ease-in-out',
        }
      );
    };

    const commit = (href: string) => {
      phaseRef.current = 'waiting';
      setRouteTransitionEntering(true);
      router.push(href);
      startPulse();
      watchdog = window.setTimeout(() => {
        if (phaseRef.current === 'waiting') reveal();
      }, WATCHDOG_MS);
    };

    const cover = (href: string, dest: Destination) => {
      phaseRef.current = 'covering';
      eyebrow.textContent = dest.eyebrow;
      label.textContent = dest.label;

      root.style.visibility = 'visible';
      root.style.pointerEvents = 'auto';
      panel.style.transform = 'translateY(100%)';
      eyebrow.style.transform = 'translateY(180%)';
      label.style.transform = 'translateY(180%)';
      rule.style.transformOrigin = 'left center';
      rule.style.transform = 'scaleX(0)';

      run(
        eyebrow,
        [{ transform: 'translateY(180%)' }, { transform: 'translateY(0)' }],
        500,
        { easing: EASE_OUT, delay: 300 }
      );
      run(
        label,
        [{ transform: 'translateY(180%)' }, { transform: 'translateY(0)' }],
        520,
        { easing: EASE_OUT, delay: 360 }
      );
      run(rule, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], 480, {
        easing: EASE_OUT,
        delay: 460,
      });

      const panelCover = run(
        panel,
        [{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }],
        COVER_MS
      );
      panelCover.finished.then(() => {
        if (phaseRef.current !== 'covering') return;
        panel.style.transform = 'translateY(0)';

        // Wait for the browser to paint the fully-covered frame before committing navigation.
        // Use multiple RAFs + a microtask to ensure paint has occurred.
        // This is critical: the panel must be visibly covering the viewport before the new route renders.
        const waitForPaint = () =>
          new Promise<void>((resolve) => {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                // Force a style recalc/paint by reading a layout property
                void panel.offsetHeight;
                resolve();
              });
            });
          });

        waitForPaint().then(() => {
          if (phaseRef.current === 'covering') commit(href);
        });
      });
    };

    // Snap straight to "fully covering", no slide-up: used when the URL has
    // already changed before we get a chance to animate (popstate, arrival).
    const instantCover = (dest: Destination) => {
      phaseRef.current = 'covering';
      eyebrow.textContent = dest.eyebrow;
      label.textContent = dest.label;
      root.style.visibility = 'visible';
      root.style.pointerEvents = 'auto';
      panel.style.transform = 'translateY(0)';
      eyebrow.style.transform = 'translateY(0)';
      label.style.transform = 'translateY(0)';
      rule.style.transformOrigin = 'left center';
      rule.style.transform = 'scaleX(1)';
    };

    const onPopState = () => {
      if (document.documentElement.dataset.motion !== 'on') return;
      if (phaseRef.current !== 'idle') return;
      // popstate also fires for same-document fragment navigation (a TOC
      // link, or back/forward across hash-only history entries on the same
      // route) — that's a scroll, not a route change, so let it stay a
      // native smooth scroll instead of flashing the curtain and yanking
      // the scroll position back to the top via reveal()'s scrollTo(0, 0).
      if (window.location.pathname === pathnameRef.current) return;

      instantCover(destinationForPath(window.location.pathname));
      phaseRef.current = 'waiting';
      setRouteTransitionEntering(true);
      startPulse();
      watchdog = window.setTimeout(() => {
        if (phaseRef.current === 'waiting') reveal();
      }, WATCHDOG_MS);

      // Safety net: Next's own popstate handling may update `pathname` before
      // or after this listener runs (order between the two isn't
      // guaranteed), so the [pathname] effect elsewhere in this component
      // might already have fired and found phase still idle, missing its
      // one chance to reveal. Poll briefly and reveal directly if so; the
      // watchdog above is the fallback of last resort either way.
      let checks = 0;
      const poll = () => {
        if (phaseRef.current !== 'waiting') return;
        if (pathnameRef.current === window.location.pathname) {
          reveal();
          return;
        }
        if (++checks < 10) popstatePoll = window.requestAnimationFrame(poll);
      };
      popstatePoll = window.requestAnimationFrame(poll);
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      // Motion gate off => never intercept, let navigation be native.
      if (document.documentElement.dataset.motion !== 'on') return;

      const anchor = (event.target as Element | null)?.closest?.(
        'a[href]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;
      if (anchor.dataset.routeTransition === 'skip') return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Same-pathname targets: query-state filters stay native, hash jumps
      // get our own animated scroll (see smoothScrollToHash above).
      if (url.pathname === window.location.pathname) {
        if (url.hash) {
          event.preventDefault();
          smoothScrollToHash(url.hash);
        }
        return;
      }

      event.preventDefault();
      if (phaseRef.current !== 'idle') return;
      cover(url.pathname + url.search + url.hash, destinationForPath(url.pathname));
    };

    apiRef.current = { reveal };
    document.addEventListener('click', onClick, true);
    window.addEventListener('popstate', onPopState);

    // Arrival: this effect only ever runs once per real page load (the
    // component lives in the root layout and never unmounts across
    // client-side navigations), so "on mount" here really does mean
    // "landing on the site". The SSR'd initial render is already in the
    // covering state (see startCovered) to avoid a flash; hold briefly, then
    // reveal to arrive.
    if (startCovered) {
      phaseRef.current = 'covering';
      arrivalTimer = window.setTimeout(() => {
        if (phaseRef.current === 'covering') reveal();
      }, ARRIVAL_HOLD_MS);
    }

    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('popstate', onPopState);
      apiRef.current = null;
      clearTimers();
      pulse?.cancel();
      cancelRunning();
      if (phaseRef.current !== 'idle') {
        phaseRef.current = 'idle';
        setRouteTransitionEntering(false);
      }
    };
  }, [router]);

  // The router committed the new route under the panel: lift it.
  useEffect(() => {
    if (phaseRef.current !== 'waiting') return;

    let revealFrame = window.requestAnimationFrame(() => {
      revealFrame = window.requestAnimationFrame(() => {
        apiRef.current?.reveal();
      });
    });

    return () => window.cancelAnimationFrame(revealFrame);
  }, [pathname]);

  return (
    <div
      aria-hidden='true'
      ref={rootRef}
      className='pointer-events-none fixed inset-0 z-[120]'
      style={{
        visibility: startCovered ? 'visible' : 'hidden',
        pointerEvents: startCovered ? 'auto' : 'none',
      }}
    >
      <div
        ref={panelRef}
        className='absolute inset-0'
        style={{
          backgroundColor: 'var(--color-paper)',
          transform: startCovered ? 'translateY(0)' : 'translateY(100%)',
        }}
      >
        <span className='absolute inset-x-0 top-0 h-[2px] bg-mark' />
        <div className='absolute inset-0 grid place-items-center'>
          <div className='flex flex-col items-center gap-5 px-6 text-center'>
            <div className='-my-[0.5em] overflow-hidden py-[0.5em]'>
              <span
                ref={eyebrowRef}
                className='block font-mono text-[0.7rem] uppercase tracking-[0.3em] text-mark'
                style={{ transform: startCovered ? 'translateY(0)' : 'translateY(180%)' }}
              >
                {startCovered ? initialDest.eyebrow : null}
              </span>
            </div>
            <div className='-my-[0.5em] overflow-hidden py-[0.5em]'>
              <span
                ref={labelRef}
                className='font-display block text-4xl font-black leading-[1.15] tracking-tight text-ink sm:text-5xl'
                style={{ transform: startCovered ? 'translateY(0)' : 'translateY(180%)' }}
              >
                {startCovered ? initialDest.label : null}
              </span>
            </div>
            <span
              ref={ruleRef}
              className='block h-[2px] w-24 origin-left bg-mark'
              style={{ transform: startCovered ? 'scaleX(1)' : 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteTransition;

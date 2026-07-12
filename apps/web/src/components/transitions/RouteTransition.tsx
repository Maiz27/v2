'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { setRouteTransitionEntering } from './route-transition-flag';

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
 */

type Phase = 'idle' | 'covering' | 'waiting' | 'revealing';

type Destination = { eyebrow: string; label: string };

const COVER_MS = 560;
const REVEAL_MS = 620;
const WATCHDOG_MS = 7000;
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

const RouteTransition = () => {
  const router = useRouter();
  const pathname = usePathname();

  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);

  const phaseRef = useRef<Phase>('idle');
  const apiRef = useRef<{ reveal: () => void } | null>(null);

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

    const clearTimers = () => {
      if (watchdog !== null) window.clearTimeout(watchdog);
      if (commitFrame !== null) window.cancelAnimationFrame(commitFrame);
      watchdog = null;
      commitFrame = null;
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
      // Same-pathname targets (hash jumps, query-state filters) stay native.
      if (url.pathname === window.location.pathname) return;

      event.preventDefault();
      if (phaseRef.current !== 'idle') return;
      cover(url.pathname + url.search + url.hash, destinationForPath(url.pathname));
    };

    apiRef.current = { reveal };
    document.addEventListener('click', onClick, true);

    return () => {
      document.removeEventListener('click', onClick, true);
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
      style={{ visibility: 'hidden', pointerEvents: 'none' }}
    >
      <div
        ref={panelRef}
        className='absolute inset-0'
        style={{ backgroundColor: 'var(--color-paper)', transform: 'translateY(100%)' }}
      >
        <span className='absolute inset-x-0 top-0 h-[2px] bg-mark' />
        <div className='absolute inset-0 grid place-items-center'>
          <div className='flex flex-col items-center gap-5 px-6 text-center'>
            <div className='-my-[0.5em] overflow-hidden py-[0.5em]'>
              <span
                ref={eyebrowRef}
                className='block font-mono text-[0.7rem] uppercase tracking-[0.3em] text-mark'
                style={{ transform: 'translateY(180%)' }}
              />
            </div>
            <div className='-my-[0.5em] overflow-hidden py-[0.5em]'>
              <span
                ref={labelRef}
                className='font-display block text-4xl font-black leading-[1.15] tracking-tight text-ink sm:text-5xl'
                style={{ transform: 'translateY(180%)' }}
              />
            </div>
            <span
              ref={ruleRef}
              className='block h-[2px] w-24 origin-left bg-mark'
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteTransition;

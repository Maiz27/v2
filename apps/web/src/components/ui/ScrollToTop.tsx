'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * A quiet Ledger control that returns the reader to the top of a long case
 * study. It stays hidden until the reader is more than ~1.25 viewports down
 * (past the point where the top nav is a scroll away), then settles in at the
 * bottom-right. Clicking runs a rAF-driven smooth scroll back to the top (see
 * `toTop` for why we don't use native smooth scroll). The appear/settle
 * transition is gated through the site motion switch in globals.css, so it
 * snaps when motion is off. While hidden it is inert — not focusable and
 * pointer-through — so it never traps a tab stop over the page.
 */
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setVisible(window.scrollY > window.innerHeight * 1.25);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => () => window.cancelAnimationFrame(rafRef.current), []);

  // Drive the scroll ourselves with rAF rather than window.scrollTo({
  // behavior: 'smooth' }). Under prefers-reduced-motion the browser forces
  // native smooth scrolling (CSS scroll-behavior included) to an instant jump,
  // which is exactly the OS setting the site's motion gate works around — so
  // native smoothness is off the table here. We also flip scroll-behavior to
  // auto for the duration so the global `html { scroll-behavior: smooth }`
  // doesn't try to re-smooth each per-frame step and fight the animation.
  const toTop = () => {
    const start = window.scrollY;
    if (start <= 0) return;
    const root = document.documentElement;
    const prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';

    const duration = 500;
    const startTime = performance.now();
    const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

    window.cancelAnimationFrame(rafRef.current);
    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      window.scrollTo(0, start * (1 - easeOutQuint(t)));
      if (t < 1) {
        rafRef.current = window.requestAnimationFrame(step);
      } else {
        root.style.scrollBehavior = prevBehavior;
      }
    };
    rafRef.current = window.requestAnimationFrame(step);
  };

  return (
    <button
      type='button'
      onClick={toTop}
      data-visible={visible}
      aria-label='Scroll back to top'
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className='ledger-to-top cv-no-print fixed bottom-6 right-6 z-40 flex items-center gap-2 border border-rule-strong bg-paper-raised px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-soft hover:border-ink hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mark focus-visible:ring-offset-2 focus-visible:ring-offset-paper'
    >
      <svg
        aria-hidden='true'
        width='11'
        height='12'
        viewBox='0 0 11 12'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='square'
      >
        <path d='M5.5 11V1.5M1.5 5 5.5 1l4 4' />
      </svg>
      <span>Top</span>
    </button>
  );
};

export default ScrollToTop;

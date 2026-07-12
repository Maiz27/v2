'use client';
import { useEffect, useState } from 'react';

/**
 * A 2px oxide-red rule pinned to the top of the viewport, drawn left-to-right as
 * the reader moves down a case study. Uses a scroll-driven animation timeline
 * (compositable transform), and renders nothing where that is unsupported.
 */
const ScrollProgress = () => {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsSupported(
        'ScrollTimeline' in window &&
          CSS.supports('animation-timeline: scroll()')
      );
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!isSupported) return null;

  return (
    <div
      className='animate-scroll-progress fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-mark'
      style={{ animationTimeline: 'scroll()' }}
    />
  );
};

export default ScrollProgress;

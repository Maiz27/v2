'use client';
import { useEffect, useState } from 'react';

// Needs TailwindCSS animation & keyframes setup
const ScrollProgress = () => {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const checkSupport = () => {
      return (
        'ScrollTimeline' in window &&
        CSS.supports('animation-timeline: scroll()')
      );
    };

    setIsSupported(checkSupport());
  }, []);

  if (!isSupported) {
    return null;
  }

  return (
    <div
      className='fixed top-0 left-0 w-full h-2 bg-linear-to-r from-primary/60 to-primary z-50 animate-scroll-progress rounded-2xl border border-white'
      style={{ animationTimeline: 'scroll()' }}
    ></div>
  );
};

export default ScrollProgress;

'use client';

import { useEffect } from 'react';
import { resolveMotion } from '@/lib/motion';

/**
 * Stamps `data-motion="on" | "off"` on the document root, re-resolved on mount
 * (and whenever the OS preference changes) through the single motion gate in
 * lib/motion.ts. See that file for why this exists. Renders nothing.
 */
const MotionGate = () => {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      document.documentElement.dataset.motion = resolveMotion(media.matches);
    };
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  return null;
};

export default MotionGate;

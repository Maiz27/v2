'use client';
import { useEffect } from 'react';

const useLockBodyScroll = (isLocked: boolean) => {
  useEffect(() => {
    // Get the original body overflow value
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Lock or unlock the body scroll based on the isLocked flag
    document.body.style.overflow = isLocked ? 'hidden' : originalStyle;
    // Cleanup: restore the original body overflow when the component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isLocked]);
};

export default useLockBodyScroll;

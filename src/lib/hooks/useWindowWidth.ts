'use client';
import { useState, useCallback, useEffect } from 'react';
import { useIsClient } from '@/lib/context/IsClientContext';

const useWindowWidth = () => {
  const isClient = useIsClient();
  const [width, setWidth] = useState(0);

  const handleResize = useCallback(() => setWidth(window.innerWidth), []);

  useEffect(() => {
    if (isClient) {
      setWidth(window.innerWidth);
    }
  }, [isClient]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize, isClient]);

  return width;
};

export default useWindowWidth;

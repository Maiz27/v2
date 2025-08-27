import { useCallback, useEffect, useState } from 'react';
import { useIsClient } from '@/lib/context/IsClientContext';
import { useToast } from '../context/ToastContext';

export const useShare = () => {
  const isClient = useIsClient();
  const { show } = useToast();
  const [currentURL, setCurrentURL] = useState(
    isClient ? window.location.href : ''
  );

  useEffect(() => {
    if (isClient) {
      setCurrentURL(window.location.href);
    }
  }, [isClient]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        console.log('URL copied to clipboard:', currentURL);
        show('URL copied to clipboard!', {
          status: 'success',
        });
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
        show('Error copying to clipboard!', {
          status: 'error',
        });
      });
  }, [currentURL, show]);

  return { currentURL, copyToClipboard };
};

import { useCallback, useEffect, useState } from 'react';
import { useIsClient } from '@/lib/context/IsClientContext';

export const useShare = () => {
  const isClient = useIsClient();
  const [status, setStatus] = useState<'success' | 'error' | undefined>();
  const [showToast, setShowToast] = useState(false);
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
        setStatus('success');
        setShowToast(true);
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
        setStatus('error');
        setShowToast(true);
      });
  }, [currentURL]);

  const closeToast = useCallback(() => {
    setShowToast(false);
  }, []);

  return { currentURL, status, showToast, copyToClipboard, closeToast };
};

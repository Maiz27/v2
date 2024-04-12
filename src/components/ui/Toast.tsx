import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TOAST_STATUS } from '@/lib/Constants';

const NOTIFICATION_TTL = 5000;

type Props = {
  show: boolean;
  message: string;
  status?: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
};

const Toast = ({
  show = false,
  message,
  status = 'success',
  onClose,
}: Props) => {
  useEffect(() => {
    if (show) {
      const timeoutRef = setTimeout(() => {
        onClose();
      }, NOTIFICATION_TTL);

      return () => clearTimeout(timeoutRef);
    }
  }, [show, onClose]);

  return (
    <div className='flex flex-col gap-1 w-max fixed top-2 right-2 z-50 pointer-events-none'>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className='flex items-center gap-2 py-2 px-4 bg-foreground rounded-lg border border-copy/10'
          >
            {TOAST_STATUS[status]}
            <span>{message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Toast;

'use client';
import {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
} from 'react';
import { TOAST_STATUS } from '../types';
import Toast from '@/components/ui/Toast';

type IToastContext = {
  showToast: boolean;
  message: string;
  show: (message: string, options?: ToastOptions) => void;
  close: () => void;
  options: ToastOptions;
};

type ToastOptions = {
  status?: TOAST_STATUS;
  autoClose?: boolean;
  onClose?: () => void;
};

const ToastContext = createContext<IToastContext | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  const [options, setOptions] = useState<ToastOptions>({});

  const show = useCallback(
    (
      message: string,
      options: {
        status?: TOAST_STATUS;
        autoClose?: boolean;
        onClose?: () => void;
      } = {}
    ) => {
      setMessage(message);
      options ? setOptions(options) : setOptions({});
      setShowToast(true);
    },
    []
  );

  const close = useCallback(() => {
    setShowToast(false);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, message, show, close, options }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export const useToast = (): IToastContext => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastContainer = () => {
  const { showToast, message, options, close } = useToast();
  const { status, onClose } = options;

  const handleClose = () => {
    close();
    onClose && onClose();
  };

  return (
    <>
      {showToast && (
        <Toast
          show={showToast}
          message={message}
          onClose={handleClose}
          status={status!}
        />
      )}
    </>
  );
};

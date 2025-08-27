import React from 'react';
import { IsClientCtxProvider } from '@/lib/context/IsClientContext';
import { ToolProvider } from '@/lib/context/ToolProvider';
import { ToastProvider } from '@/lib/context/ToastContext';

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <IsClientCtxProvider>
      <ToolProvider>
        <ToastProvider>{children}</ToastProvider>
      </ToolProvider>
    </IsClientCtxProvider>
  );
};

export default ContextProvider;

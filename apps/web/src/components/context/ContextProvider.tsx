import React from 'react';
import { IsClientCtxProvider } from '@/lib/context/IsClientContext';
import { ToolProvider } from '@/lib/context/ToolProvider';
import { ToastProvider } from '@/lib/context/ToastContext';
import { Tool } from '@/lib/types';

type Props = {
  children: React.ReactNode;
  tools: Tool[];
};

const ContextProvider = ({ children, tools }: Props) => {
  return (
    <IsClientCtxProvider>
      <ToolProvider tools={tools}>
        <ToastProvider>{children}</ToastProvider>
      </ToolProvider>
    </IsClientCtxProvider>
  );
};

export default ContextProvider;

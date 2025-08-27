import React from 'react';
import { IsClientCtxProvider } from '@/lib/context/IsClientContext';
import { ToolProvider } from '@/lib/context/ToolProvider';
import { ToastProvider } from '@/lib/context/ToastContext';
import { GetToolsResult } from '@/lib/sanity/types';

type Props = {
  children: React.ReactNode;
  tools: GetToolsResult;
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

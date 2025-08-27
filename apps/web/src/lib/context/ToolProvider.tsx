'use client';

import { createContext, useContext } from 'react';
import { GetToolsResult } from '../sanity/types';

export const ToolContext = createContext<GetToolsResult | null>(null);

export const ToolProvider = ({
  children,
  tools,
}: {
  children: React.ReactNode;
  tools: GetToolsResult;
}) => {
  return <ToolContext.Provider value={tools}>{children}</ToolContext.Provider>;
};

export const useTools = () => {
  const context = useContext(ToolContext);
  if (context === null) {
    throw new Error('useTools must be used within a ToolProvider');
  }
  return context;
};

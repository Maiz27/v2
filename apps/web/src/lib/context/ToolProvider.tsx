'use client';

import { createContext, useContext } from 'react';
import { Tool } from '@/lib/types';

export const ToolContext = createContext<Tool[] | null>(null);

export const ToolProvider = ({ children, tools }: { children: React.ReactNode, tools: Tool[] }) => {
  return <ToolContext.Provider value={tools}>{children}</ToolContext.Provider>;
};

export const useTools = () => {
  const context = useContext(ToolContext);
  if (context === null) {
    throw new Error('useTools must be used within a ToolProvider');
  }
  return context;
};
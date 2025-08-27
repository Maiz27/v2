'use client';

import Link from 'next/link';
import DynamicToolIcon from './DynamicToolIcon';
import { useTools } from '@/lib/context/ToolProvider';
import { GetToolsResult } from '@/lib/sanity/types';

const ToolsRow = ({ tools }: { tools: GetToolsResult }) => {
  const tools_ctx = useTools();

  if (!tools_ctx || !tools) return null;

  return tools.map(({ name }) => {
    const tool = tools_ctx.find((t) => t.name === name);

    if (!tool) return null;

    return (
      <Link
        key={name}
        href={tool.href!}
        data-tip={name}
        title={name}
        target='_blank'
        rel='noopener noreferrer'
        className='text-xl opacity-70 hover:opacity-100 hover:text-primary transition-all'
      >
        <DynamicToolIcon tool={tool} className='w-5 h-5' />
      </Link>
    );
  });
};

export default ToolsRow;

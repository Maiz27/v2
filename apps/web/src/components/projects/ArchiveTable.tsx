'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';
import { GetProjectsResult } from '@/lib/sanity/types';

type Props = {
  projects: GetProjectsResult;
};

const projectYear = (date: string) => new Date(date).getFullYear();
const primaryTool = (tools: GetProjectsResult[number]['tools']) =>
  tools?.[0]?.name ?? '';

/**
 * The full archive as a Ledger table, filtered by tool. There is no "kind"
 * field in Sanity, so the chips are built from the tools referenced across all
 * projects. Every row links to its case study. Filtering is client-side and
 * single-select; the /projects URL never changes.
 */
const ArchiveTable = ({ projects }: Props) => {
  const tools = useMemo(() => {
    const names = new Set<string>();
    projects.forEach((p) => p.tools?.forEach((t) => names.add(t.name)));
    return ['All', ...Array.from(names).sort()];
  }, [projects]);

  const [tool, setTool] = useState('All');

  const rows = useMemo(
    () =>
      tool === 'All'
        ? projects
        : projects.filter((p) => p.tools?.some((t) => t.name === tool)),
    [projects, tool]
  );

  return (
    <>
      {/* Filter chips */}
      <div className='flex flex-wrap items-center gap-x-2 gap-y-2 border-b border-rule pb-4'>
        <span className='mr-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-faint'>
          Filter
        </span>
        {tools.map((t) => {
          const active = t === tool;
          return (
            <button
              key={t}
              type='button'
              onClick={() => setTool(t)}
              aria-pressed={active}
              className={`cursor-pointer rounded-sm border px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] transition-colors duration-200 ${
                active
                  ? 'border-ink bg-ink text-paper'
                  : 'border-rule text-ink-soft hover:border-rule-strong hover:text-ink'
              }`}
            >
              {t}
            </button>
          );
        })}
        <span className='ml-auto font-mono text-[0.62rem] text-ink-faint'>
          {rows.length} of {projects.length}
        </span>
      </div>

      {/* Ledger table */}
      <ol className='mt-1'>
        {rows.map((project, i) => (
          <Reveal
            as='li'
            key={project.slug?.current ?? i}
            className='row-reveal border-b border-rule'
          >
            <Link
              href={`/projects/${project.slug?.current}`}
              className='group grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-baseline gap-x-3 py-3.5 transition-colors duration-200 hover:bg-paper-raised md:-mx-3 md:px-3'
            >
              <span className='font-mono text-[0.68rem] text-ink-faint'>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className='font-display text-[1.05rem] font-semibold'>
                {project.title}
              </span>
              <span className='flex items-baseline gap-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-faint group-hover:text-mark'>
                <span className='tabular-nums'>{projectYear(project.date)}</span>
                {primaryTool(project.tools) && (
                  <>
                    <span className='text-rule-strong'>/</span>
                    <span>{primaryTool(project.tools)}</span>
                  </>
                )}
                <span className='ml-1'>&rarr;</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ol>
    </>
  );
};

export default ArchiveTable;

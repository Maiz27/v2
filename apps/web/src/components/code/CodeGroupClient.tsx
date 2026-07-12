'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';

type Tab = { filename: string; source?: string | null };

/**
 * Ledger snippet group: a tab strip of filenames on the paper-raised surface,
 * with a view-source link for the active file. The listings themselves are
 * highlighted on the server and passed in as children; this only switches which
 * one is shown.
 */
const CodeGroupClient = ({
  id,
  title,
  tabs,
  children,
}: {
  id: string;
  title?: string;
  tabs: Tab[];
  children: React.ReactNode[];
}) => {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeSource = tabs[active]?.source;

  // Roving keyboard navigation for tabs
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let newIndex = active;
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        newIndex = (active + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        e.preventDefault();
        newIndex = (active - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }
    setActive(newIndex);
    tabRefs.current[newIndex]?.focus();
  };

  return (
    <figure id={id} className='my-10 scroll-m-16'>
      {title && (
        <p className='mb-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-faint'>
          {title}
        </p>
      )}
      <div className='flex flex-wrap items-stretch justify-between gap-2 border border-b-0 border-rule bg-paper-raised'>
        <div role='tablist' className='flex flex-wrap'>
          {tabs.map((tab, i) => {
            const isActive = i === active;
            const tabId = `${id}-tab-${i}`;
            const panelId = `${id}-panel-${i}`;
            return (
              <button
                ref={(el) => (tabRefs.current[i] = el)}
                key={tab.filename + i}
                id={tabId}
                type='button'
                role='tab'
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className={`cursor-pointer border-r border-rule px-4 py-2.5 font-mono text-[0.72rem] transition-colors duration-200 ${
                  isActive
                    ? 'bg-ink text-paper'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                {tab.filename}
              </button>
            );
          })}
        </div>
        {activeSource && (
          <a
            href={activeSource}
            target='_blank'
            rel='noreferrer noopener'
            className='link-underline self-center px-4 font-mono text-[0.7rem] text-mark'
          >
            view source
          </a>
        )}
      </div>
      <div className='border border-rule'>
        {children.map((child, i) => {
          const isActive = i === active;
          const tabId = `${id}-tab-${i}`;
          const panelId = `${id}-panel-${i}`;
          return (
            <div
              key={i}
              id={panelId}
              role='tabpanel'
              aria-labelledby={tabId}
              hidden={!isActive}
            >
              {child}
            </div>
          );
        })}
      </div>
    </figure>
  );
};

export default CodeGroupClient;

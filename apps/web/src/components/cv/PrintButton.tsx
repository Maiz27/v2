'use client';

import { useEffect } from 'react';
import { OWNER } from '@/lib/site';

/** Chrome names a saved PDF after the document title, and "|" becomes "_". */
const PRINT_TITLE = `${OWNER.name} CV`;

/** Ledger-styled trigger for the browser print / save-as-PDF dialog. */
const PrintButton = () => {
  // Swap the title for any print (this button or Ctrl+P) so the PDF saves as
  // "Maged Faiz CV.pdf", then restore it for the tab.
  useEffect(() => {
    let pageTitle = document.title;
    const onBeforePrint = () => {
      pageTitle = document.title;
      document.title = PRINT_TITLE;
    };
    const onAfterPrint = () => {
      document.title = pageTitle;
    };
    window.addEventListener('beforeprint', onBeforePrint);
    window.addEventListener('afterprint', onAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', onBeforePrint);
      window.removeEventListener('afterprint', onAfterPrint);
    };
  }, []);

  return (
    <button
      type='button'
      onClick={() => window.print()}
      className='cv-no-print cursor-pointer rounded-sm border border-ink px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] transition-colors duration-200 hover:bg-ink hover:text-paper'
    >
      Print / save as PDF
    </button>
  );
};

export default PrintButton;

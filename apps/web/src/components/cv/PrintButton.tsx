'use client';

/** Ledger-styled trigger for the browser print / save-as-PDF dialog. */
const PrintButton = () => (
  <button
    type='button'
    onClick={() => window.print()}
    className='cv-no-print cursor-pointer rounded-sm border border-ink px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] transition-colors duration-200 hover:bg-ink hover:text-paper'
  >
    Print / save as PDF
  </button>
);

export default PrintButton;

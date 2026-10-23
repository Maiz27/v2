/**
 * Marks a case study rendered in draft preview, with the way out. A plain
 * anchor on purpose: a prefetching <Link> to /api/draft/disable would clear
 * the draft cookie before anyone clicked it.
 */
const DraftBanner = () => (
  <div
    role='status'
    className='draw-b-hair flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3 font-mono text-[0.7rem] uppercase tracking-[0.2em]'
  >
    <span className='text-mark'>Draft preview</span>
    <a
      href='/api/draft/disable'
      className='text-ink-soft underline decoration-dotted underline-offset-4 hover:text-mark'
    >
      Exit preview
    </a>
  </div>
);

export default DraftBanner;

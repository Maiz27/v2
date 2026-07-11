import Link from 'next/link';
import Masthead from '@/components/layout/Masthead';
import SiteFooter from '@/components/layout/SiteFooter';

export default function NotFound() {
  return (
    <div className='mx-auto flex min-h-dvh max-w-4xl flex-col px-6 md:px-10'>
      <Masthead />

      <section className='flex flex-1 flex-col justify-center py-24'>
        <p className='mb-5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-mark'>
          404 &middot; Not on file
        </p>
        <h1 className='font-display max-w-[18ch] text-[clamp(2.25rem,6vw,4rem)] font-black leading-[1.05] tracking-tight'>
          No such page.
        </h1>
        <p className='mt-6 max-w-[52ch] text-[1.0625rem] leading-[1.7] text-ink-soft'>
          The page you were after is not in the ledger. Head back to the index,
          or browse the full archive.
        </p>
        <div className='mt-8 flex gap-6 font-mono text-[0.72rem] uppercase tracking-[0.16em]'>
          <Link
            href='/'
            className='underline decoration-dotted underline-offset-4 hover:text-mark'
          >
            &larr; Index
          </Link>
          <Link
            href='/projects'
            className='underline decoration-dotted underline-offset-4 hover:text-mark'
          >
            Archive
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

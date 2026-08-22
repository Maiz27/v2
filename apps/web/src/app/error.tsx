'use client';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorProps) {
  return (
    <main className='mx-auto flex min-h-dvh max-w-4xl flex-col justify-center px-6 py-24 md:px-10'>
      <p className='mb-5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-mark'>
        500 &middot; Page fault
      </p>
      <h1 className='font-display max-w-[18ch] text-[clamp(2.25rem,6vw,4rem)] font-black leading-[1.05] tracking-tight'>
        Something went wrong.
      </h1>
      <p className='mt-6 max-w-[52ch] text-[1.0625rem] leading-[1.7] text-ink-soft'>
        This page fell out of the file. Try opening it again.
      </p>
      <button
        type='button'
        onClick={reset}
        className='mt-8 w-fit font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink underline decoration-dotted underline-offset-4 hover:text-mark'
      >
        Try again
      </button>
    </main>
  );
}

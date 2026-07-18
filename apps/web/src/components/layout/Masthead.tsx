import Link from 'next/link';
import { HiOutlineEnvelope, HiOutlineDocumentText } from 'react-icons/hi2';
import { SiGithub } from 'react-icons/si';
import Reveal from '@/components/motion/Reveal';
import { OWNER } from '@/lib/site';
import { fetchSanityData } from '@/lib/sanity/client';
import { getAboutMe } from '@/lib/sanity/queries';
import type { GetAboutMeResult } from '@/lib/sanity/types';

/**
 * The running head on every page. Owner name doubles as the link home. The
 * right-side actions (Email / GitHub / CV) collapse to quiet line icons below
 * md and show their labels from md up (fix #11). Load-staggered on first paint.
 * The role line is Sanity-managed (aboutMe.role), OWNER.role as fallback.
 */
const Masthead = async () => {
  const about = await fetchSanityData<GetAboutMeResult>(getAboutMe).catch(() => null);
  return (
    <Reveal
      as='header'
      className='draw-b flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5 font-mono text-[0.7rem] uppercase tracking-[0.16em]'
    >
      <Link
        href='/'
        className='ledger-load font-bold hover:text-mark'
        style={{ '--i': 0 } as React.CSSProperties}
      >
        {OWNER.name}
      </Link>
      <span
        className='ledger-load hidden text-ink-faint sm:inline'
        style={{ '--i': 1 } as React.CSSProperties}
      >
        {about?.role ?? OWNER.role}
      </span>
      <nav
        className='ledger-load flex items-center gap-5'
        style={{ '--i': 2 } as React.CSSProperties}
      >
        <a
          href={`mailto:${OWNER.email}`}
          aria-label='Email'
          className='flex items-center gap-1.5 hover:text-mark md:underline md:decoration-dotted md:underline-offset-4'
        >
          <HiOutlineEnvelope className='text-base md:hidden' aria-hidden />
          <span className='hidden md:inline'>Email</span>
        </a>
        <a
          href={OWNER.github}
          target='_blank'
          rel='noreferrer noopener'
          aria-label='GitHub'
          className='flex items-center gap-1.5 hover:text-mark md:underline md:decoration-dotted md:underline-offset-4'
        >
          <SiGithub className='text-base md:hidden' aria-hidden />
          <span className='hidden md:inline'>GitHub</span>
        </a>
        <Link
          href={OWNER.cv}
          aria-label='CV, Curriculum vitae'
          className='flex items-center gap-1.5 hover:text-mark md:underline md:decoration-dotted md:underline-offset-4'
        >
          <HiOutlineDocumentText className='text-base md:hidden' aria-hidden />
          <span className='hidden md:inline'>CV</span>
        </Link>
      </nav>
    </Reveal>
  );
};

export default Masthead;

import Link from 'next/link';
import { OWNER, NAV } from '@/lib/site';

/**
 * The real site footer: navigation, contact, copyright. A short colophon line
 * stays as a quiet flourish. Replaces the prototype's "Direction A of 2"
 * colophon (fix #5).
 */
const SiteFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className='mt-24 border-t-2 border-ink py-8 font-mono text-[0.7rem]'
      data-route-transition='skip'
    >
      <div className='flex flex-col gap-8 sm:flex-row sm:justify-between'>
        <nav
          aria-label='Footer'
          className='flex gap-5 uppercase tracking-[0.14em]'
        >
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className='hover:text-mark'>
              {item.name}
            </Link>
          ))}
        </nav>

        <ul className='flex flex-wrap gap-x-5 gap-y-2 text-ink-soft'>
          <li>
            <a
              href={`mailto:${OWNER.email}`}
              className='hover:text-mark'
            >
              {OWNER.email}
            </a>
          </li>
          <li>
            <a
              href={OWNER.github}
              target='_blank'
              rel='noreferrer noopener'
              className='hover:text-mark'
            >
              {OWNER.githubLabel}
            </a>
          </li>
          <li>
            <a
              href={OWNER.linkedin}
              target='_blank'
              rel='noreferrer noopener'
              className='hover:text-mark'
            >
              {OWNER.linkedinLabel}
            </a>
          </li>
        </ul>
      </div>

      <div className='mt-8 flex flex-col gap-2 text-[0.65rem] uppercase tracking-[0.14em] text-ink-faint sm:flex-row sm:justify-between'>
        <span>
          &copy; {year} {OWNER.name}
        </span>
        <span>Set in Besley, Source Serif 4 &amp; Fragment Mono</span>
      </div>
    </footer>
  );
};

export default SiteFooter;

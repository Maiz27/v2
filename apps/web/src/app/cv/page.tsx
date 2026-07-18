import Link from 'next/link';
import PrintButton from '@/components/cv/PrintButton';
import { OWNER } from '@/lib/site';
import { getCvData } from '@/lib/cv/data';
import { fetchSanityData } from '@/lib/sanity/client';
import { getAboutMe } from '@/lib/sanity/queries';
import type { GetAboutMeResult } from '@/lib/sanity/types';
import { getDynamicMetaData } from '@/lib/utilities';

// Freshness is webhook-driven (see /api/revalidate); this is only a fallback
// for a missed webhook.
export const revalidate = 86400;

export async function generateMetadata() {
  const data = await getDynamicMetaData('/cv');
  return data;
}

const Cv = async () => {
  const [{ summary, experience, projects, education, skillGroups }, about] =
    await Promise.all([getCvData(), fetchSanityData<GetAboutMeResult>(getAboutMe)]);

  return (
    <div className='cv-page mx-auto max-w-3xl px-6 md:px-10 print:max-w-none print:px-0'>
      {/* Screen-only nav row (hidden in print) */}
      <div className='cv-no-print flex items-center justify-between gap-4 py-5 font-mono text-[0.7rem] uppercase tracking-[0.16em]'>
        <Link
          href='/'
          className='underline decoration-dotted underline-offset-4 hover:text-mark'
        >
          &larr; Index
        </Link>
        <PrintButton />
      </div>

      {/* Document head */}
      <header className='draw-b flex flex-wrap items-end justify-between gap-x-8 gap-y-3 pb-5 print:pb-3'>
        <div>
          <h1 className='font-display text-[clamp(2rem,5vw,3rem)] font-black leading-none tracking-tight print:text-[21pt]'>
            {OWNER.name}
          </h1>
          <p className='mt-2 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-mark print:mt-1.5 print:text-[8pt]'>
            {about?.role ?? OWNER.role}
          </p>
        </div>
        <ul className='space-y-1 font-mono text-[0.72rem] text-ink-soft print:space-y-0.5 print:text-[8pt]'>
          <li>
            <a
              href={`mailto:${OWNER.email}`}
              className='underline decoration-dotted underline-offset-4 hover:text-mark'
            >
              {OWNER.email}
            </a>
          </li>
          <li>
            <a
              href={OWNER.github}
              target='_blank'
              rel='noreferrer noopener'
              className='underline decoration-dotted underline-offset-4 hover:text-mark'
            >
              {OWNER.githubLabel}
            </a>
          </li>
          <li>
            <a
              href={OWNER.linkedin}
              target='_blank'
              rel='noreferrer noopener'
              className='underline decoration-dotted underline-offset-4 hover:text-mark'
            >
              {OWNER.linkedinLabel}
            </a>
          </li>
          <li>
            <a
              href={OWNER.site}
              target='_blank'
              rel='noreferrer noopener'
              className='underline decoration-dotted underline-offset-4 hover:text-mark'
            >
              {OWNER.siteLabel}
            </a>
          </li>
        </ul>
      </header>

      <main>
      {/* Summary */}
      <section className='py-7 print:py-4'>
        <p className='max-w-[70ch] text-[1.0625rem] leading-[1.7] text-ink-soft print:max-w-none print:text-[10pt] print:leading-[1.5]'>
          {summary}
        </p>
      </section>

      {/* Experience: shares page 1 with the intro, so it gets room to breathe. */}
      <Section num='01' title='Experience'>
        <div className='space-y-8 print:space-y-6'>
          {experience.map((role) => (
            <article key={`${role.org}-${role.title}`} className='cv-block'>
              <div className='flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1'>
                <h3 className='font-display text-[1.2rem] font-bold print:text-[12pt]'>
                  {role.title}
                  {role.org && (
                    <span className='font-body font-normal text-ink-soft'>
                      {' '}
                      &middot; {role.org}
                    </span>
                  )}
                </h3>
                <span className='font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-faint print:text-[7.5pt]'>
                  {role.dates}
                </span>
              </div>
              <p className='mt-0.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-faint print:text-[7.5pt]'>
                {role.place}
              </p>
              <ul className='mt-3 space-y-2 print:mt-2 print:space-y-1.5'>
                {role.bullets.map((b) => (
                  <li
                    key={b.slice(0, 28)}
                    className='grid grid-cols-[0.9rem_minmax(0,1fr)] gap-x-2 text-[0.95rem] leading-relaxed text-ink-soft print:text-[9.5pt] print:leading-snug'
                  >
                    <span className='font-mono text-mark'>&rsaquo;</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className='mt-3 font-mono text-[0.68rem] text-ink-faint print:mt-2 print:text-[7.5pt]'>
                {role.tech}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Selected projects: starts fresh on page 2 so page 1 (intro +
          experience) isn't cramped to make room for it. */}
      <Section num='02' title='Selected projects' pageBreakBefore>
        <div className='space-y-7 print:space-y-5'>
          {projects.map((project) => (
            <article key={project.name} className='cv-block'>
              <div className='flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1'>
                <h3 className='font-display text-[1.2rem] font-bold print:text-[12pt]'>
                  {project.name}
                </h3>
                {/* Print keeps the original single-line "stack / date" format. */}
                <span className='hidden font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-faint print:inline print:text-[7.5pt]'>
                  {project.meta}
                </span>
                {/* Screen: date stays with the name, tools move to their own line below. */}
                <span className='font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-faint print:hidden'>
                  {project.dateLabel}
                </span>
              </div>
              <p className='mt-0.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-faint print:hidden'>
                {project.stack}
              </p>
              <p className='mt-2 max-w-[72ch] text-[0.95rem] leading-relaxed text-ink-soft print:mt-1.5 print:max-w-none print:text-[9pt] print:leading-snug'>
                {project.blurb}
              </p>
              {project.href && (
                <a
                  href={project.href}
                  target='_blank'
                  rel='noreferrer noopener'
                  className='mt-1.5 inline-block font-mono text-[0.68rem] text-mark underline decoration-dotted underline-offset-4 hover:decoration-solid print:mt-1 print:text-[7.5pt]'
                >
                  {project.hrefLabel}
                </a>
              )}
            </article>
          ))}
        </div>
      </Section>

      {/* Education + Skills */}
      <div className='grid gap-x-10 gap-y-10 md:grid-cols-2 print:grid-cols-2 print:gap-y-5'>
        <Section num='03' title='Education'>
          <h3 className='font-display text-[1.1rem] font-bold print:text-[10.5pt]'>
            {education.degree}
          </h3>
          <p className='mt-1 text-[0.95rem] leading-relaxed text-ink-soft print:text-[9.5pt]'>
            {education.place}
          </p>
          <p className='mt-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-faint print:text-[7.5pt]'>
            {education.detail}
          </p>
        </Section>

        <Section num='04' title='Skills'>
          <dl className='space-y-3 print:space-y-2.5'>
            {skillGroups.map((group) => (
              <div key={group.label} className='print:break-inside-avoid'>
                <dt className='font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-faint print:text-[7pt]'>
                  {group.label}
                </dt>
                <dd className='mt-0.5 text-[0.95rem] leading-relaxed text-ink-soft print:text-[9.5pt] print:leading-snug'>
                  {group.items}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      </div>
      </main>

      {/* Decorative only (name/role already lead the document) — dropped
          from print so it can't tip otherwise single-page-per-section content
          onto a trailing near-blank page. */}
      <footer className='cv-no-print mt-14 border-t-2 border-ink py-6 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-faint'>
        <Link href='/' className='link-underline text-mark'>
          &larr; Back to the index
        </Link>
        <span className='mx-2'>&middot;</span>
        {OWNER.name} &middot; Curriculum vitae
      </footer>
    </div>
  );
};

const Section = ({
  num,
  title,
  children,
  pageBreakBefore,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
  pageBreakBefore?: boolean;
}) => (
  <section
    className={`py-7 print:py-3 ${pageBreakBefore ? 'print:break-before-page' : ''}`}
  >
    <div className='mb-5 flex items-baseline gap-4 border-b border-rule pb-2.5 print:mb-2.5 print:pb-1.5'>
      <span className='font-mono text-[0.68rem] font-bold text-mark print:text-[8pt]'>
        {num}
      </span>
      <h2 className='font-mono text-[0.68rem] uppercase tracking-[0.2em] print:text-[8pt]'>
        {title}
      </h2>
    </div>
    {children}
  </section>
);

export default Cv;

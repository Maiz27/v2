import Link from 'next/link';
import PrintButton from '@/components/cv/PrintButton';
import { OWNER } from '@/lib/site';
import { CV } from '@/lib/cv/data';
import { getDynamicMetaData } from '@/lib/utilities';

export const revalidate = 60;

export async function generateMetadata() {
  const data = await getDynamicMetaData('/cv');
  return data;
}

const Cv = () => {
  const { summary, experience, projects, education, skillGroups } = CV;

  return (
    <div className='cv-page mx-auto max-w-3xl px-6 md:px-10'>
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
      <header className='draw-b flex flex-wrap items-end justify-between gap-x-8 gap-y-3 pb-5'>
        <div>
          <h1 className='font-display text-[clamp(2rem,5vw,3rem)] font-black leading-none tracking-tight'>
            {OWNER.name}
          </h1>
          <p className='mt-2 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-mark'>
            {OWNER.role}
          </p>
        </div>
        <ul className='space-y-1 font-mono text-[0.72rem] text-ink-soft'>
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

      {/* Summary */}
      <section className='py-7'>
        <p className='max-w-[70ch] text-[1.0625rem] leading-[1.7] text-ink-soft'>
          {summary}
        </p>
      </section>

      {/* Experience */}
      <Section num='01' title='Experience'>
        <div className='space-y-8'>
          {experience.map((role) => (
            <article key={`${role.org}-${role.title}`} className='cv-block'>
              <div className='flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1'>
                <h3 className='font-display text-[1.2rem] font-bold'>
                  {role.title}
                  <span className='font-body font-normal text-ink-soft'>
                    {' '}
                    &middot; {role.org}
                  </span>
                </h3>
                <span className='font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-faint'>
                  {role.dates}
                </span>
              </div>
              <p className='mt-0.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-faint'>
                {role.place}
              </p>
              <ul className='mt-3 space-y-2'>
                {role.bullets.map((b) => (
                  <li
                    key={b.slice(0, 28)}
                    className='grid grid-cols-[0.9rem_minmax(0,1fr)] gap-x-2 text-[0.95rem] leading-relaxed text-ink-soft'
                  >
                    <span className='font-mono text-mark'>&rsaquo;</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className='mt-3 font-mono text-[0.68rem] text-ink-faint'>
                {role.tech}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Selected projects */}
      <Section num='02' title='Selected projects'>
        <div className='space-y-7'>
          {projects.map((project) => (
            <article key={project.name} className='cv-block'>
              <div className='flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1'>
                <h3 className='font-display text-[1.2rem] font-bold'>
                  {project.name}
                </h3>
                <span className='font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-faint'>
                  {project.meta}
                </span>
              </div>
              <p className='mt-2 max-w-[72ch] text-[0.95rem] leading-relaxed text-ink-soft'>
                {project.blurb}
              </p>
              <a
                href={project.href}
                target='_blank'
                rel='noreferrer noopener'
                className='mt-1.5 inline-block font-mono text-[0.68rem] text-mark underline decoration-dotted underline-offset-4 hover:decoration-solid'
              >
                {project.hrefLabel}
              </a>
            </article>
          ))}
        </div>
      </Section>

      {/* Education + Skills */}
      <div className='grid gap-x-10 gap-y-10 md:grid-cols-2'>
        <Section num='03' title='Education'>
          <h3 className='font-display text-[1.1rem] font-bold'>
            {education.degree}
          </h3>
          <p className='mt-1 text-[0.95rem] leading-relaxed text-ink-soft'>
            {education.place}
          </p>
          <p className='mt-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-faint'>
            {education.detail}
          </p>
        </Section>

        <Section num='04' title='Skills'>
          <dl className='space-y-3'>
            {skillGroups.map((group) => (
              <div key={group.label}>
                <dt className='font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-faint'>
                  {group.label}
                </dt>
                <dd className='mt-0.5 text-[0.95rem] leading-relaxed text-ink-soft'>
                  {group.items}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      </div>

      <footer className='mt-14 border-t-2 border-ink py-6 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-faint'>
        <span className='cv-no-print'>
          <Link href='/' className='link-underline text-mark'>
            &larr; Back to the index
          </Link>
          <span className='mx-2'>&middot;</span>
        </span>
        {OWNER.name} &middot; Curriculum vitae
      </footer>
    </div>
  );
};

const Section = ({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section className='cv-block py-7'>
    <div className='mb-5 flex items-baseline gap-4 border-b border-rule pb-2.5'>
      <span className='font-mono text-[0.68rem] font-bold text-mark'>{num}</span>
      <h2 className='font-mono text-[0.68rem] uppercase tracking-[0.2em]'>
        {title}
      </h2>
    </div>
    {children}
  </section>
);

export default Cv;

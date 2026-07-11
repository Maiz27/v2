import Link from 'next/link';
import Masthead from '@/components/layout/Masthead';
import SiteFooter from '@/components/layout/SiteFooter';
import HeroTitle from '@/components/home/HeroTitle';
import Reveal from '@/components/motion/Reveal';
import JsonLd from '@/components/jsonLd/JsonLd';
import { PersonSchema } from '@/lib/schema';
import { OWNER } from '@/lib/site';
import { fetchSanityData } from '@/lib/sanity/client';
import { getProjects } from '@/lib/sanity/queries';
import { getDynamicMetaData } from '@/lib/utilities';
import { GetProjectsResult } from '@/lib/sanity/types';

export const revalidate = 60;

export async function generateMetadata() {
  const data = await getDynamicMetaData('/');
  return data;
}

const projectYear = (date: string) => new Date(date).getFullYear();
const primaryTool = (tools: GetProjectsResult[number]['tools']) =>
  tools?.[0]?.name ?? '';

export default async function Home() {
  const projects: GetProjectsResult = await fetchSanityData(getProjects);
  const selected = projects.filter((p) => p.featured);
  const archive = projects.filter((p) => !p.featured);

  return (
    <div className='mx-auto max-w-6xl px-6 md:px-10'>
      <JsonLd schema={PersonSchema} />

      <Masthead />

      {/* Hero */}
      <section className='py-16 md:py-24'>
        <p
          className='ledger-load mb-6 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-mark'
          style={{ '--i': 3 } as React.CSSProperties}
        >
          Proof of work
        </p>
        <HeroTitle
          text='The work, written down.'
          className='ledger-load font-display max-w-[16ch] text-[clamp(2.75rem,7vw,5.5rem)] font-black leading-[1.02] tracking-tight'
        />
        <p
          className='ledger-load mt-8 max-w-[56ch] text-[1.125rem] leading-[1.7] text-ink-soft md:text-[1.25rem]'
          style={{ '--i': 5 } as React.CSSProperties}
        >
          A slick site is cheap to fake now. Judgment is not. So this is mostly
          writing: one honest case study per project, decisions and dead ends
          included, with the source a click from the claim.
        </p>
      </section>

      {/* Selected work */}
      <section>
        <Reveal as='div' className='draw-b flex items-baseline gap-4 pb-3'>
          <span className='font-mono text-[0.7rem] font-bold text-mark'>01</span>
          <h2 className='font-mono text-[0.7rem] uppercase tracking-[0.2em]'>
            Selected work
          </h2>
          <span className='ml-auto font-mono text-[0.7rem] text-ink-faint'>
            {selected.length} entries
          </span>
        </Reveal>

        <ol>
          {selected.map((project, i) => (
            <Reveal
              as='li'
              key={project.slug?.current ?? i}
              className='row-reveal border-b border-rule'
            >
              <Link
                href={`/projects/${project.slug?.current}`}
                className='group grid grid-cols-[2.75rem_minmax(0,1fr)] items-baseline gap-x-2 py-6 transition-colors duration-200 hover:bg-paper-raised md:-mx-3 md:grid-cols-[2.75rem_minmax(0,1fr)_10rem] md:px-3'
              >
                <span className='font-mono text-[0.75rem] text-ink-faint'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className='min-w-0'>
                  <span className='font-display text-xl font-bold leading-snug md:text-2xl'>
                    {project.title}
                  </span>
                  <span className='mt-1.5 block max-w-[60ch] text-[0.9375rem] leading-relaxed text-ink-soft'>
                    {project.description}
                  </span>
                </span>
                <span className='col-start-2 mt-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-faint transition-colors duration-200 group-hover:text-mark md:col-start-3 md:mt-0 md:text-right'>
                  {projectYear(project.date)}
                  {primaryTool(project.tools) && ` / ${primaryTool(project.tools)}`}
                  <span className='ml-2'>&rarr;</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Archive */}
      <section className='mt-20'>
        <Reveal as='div' className='draw-b-hair flex items-baseline gap-4 pb-2.5'>
          <span className='font-mono text-[0.68rem] font-bold text-ink-faint'>
            02
          </span>
          <h2 className='font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink-soft'>
            Archive
          </h2>
          <Link
            href='/projects'
            className='link-underline ml-auto font-mono text-[0.65rem] uppercase tracking-[0.14em] text-mark'
          >
            All {projects.length} &rarr;
          </Link>
        </Reveal>
        <ol className='mt-1'>
          {archive.map((project, i) => (
            <Reveal
              as='li'
              key={project.slug?.current ?? i}
              className='row-reveal border-b border-rule'
            >
              <Link
                href={`/projects/${project.slug?.current}`}
                className='group grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-baseline gap-x-3 py-3 text-ink-soft transition-colors duration-200 hover:text-ink'
              >
                <span className='font-mono text-[0.68rem] text-ink-faint'>
                  {String(selected.length + i + 1).padStart(2, '0')}
                </span>
                <span className='font-display text-[0.95rem] font-semibold'>
                  {project.title}
                </span>
                <span className='font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-faint group-hover:text-mark'>
                  {projectYear(project.date)}
                  <span className='ml-2'>&rarr;</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* About */}
      <section className='mt-24'>
        <Reveal as='div' className='draw-b flex items-baseline gap-4 pb-3'>
          <span className='font-mono text-[0.7rem] font-bold text-mark'>03</span>
          <h2 className='font-mono text-[0.7rem] uppercase tracking-[0.2em]'>
            About
          </h2>
        </Reveal>
        <div className='grid gap-10 py-10 md:grid-cols-[minmax(0,1fr)_14rem]'>
          <div className='max-w-[58ch] space-y-5'>
            <p className='text-[1.0625rem] leading-[1.7] text-ink-soft'>
              I am Maged, a software engineer. I taught myself React at
              university getting the first version of this site out the door,
              back when most of my classmates did not have one, and I have been
              chasing the same thing ever since: the platform feature under the
              library, the Intersection Observer before the package that wraps
              it. I build tools for problems I actually have. Follow Sync came
              out of losing track of my own GitHub network; Hareeg Table is the
              card game app I wished someone had built for me. The parts I like
              are the ones people skip: the rate limits, the reconnection logic,
              the guardrails around code an AI helped write.
            </p>
            <p className='text-[1.0625rem] leading-[1.7] text-ink-soft'>
              Writing it all down is the habit that outlasted the rest. That one
              is on my friend Eman, who kept sending me his deep-dive posts
              until I started writing my own. It clicked the day I opened an old
              project of mine and could not remember what half the code did. If
              a project was not worth writing about, it is not here.
            </p>

            <div className='mt-8 border-t border-rule pt-4'>
              <p className='font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-faint'>
                <span className='text-mark'>2026</span> &middot; Currently
              </p>
              <p className='mt-2 text-[0.95rem] leading-relaxed text-ink-soft'>
                Still building out Hareeg Table, and rebuilding this site into
                its V3.
              </p>
            </div>
          </div>

          <ul className='space-y-2 font-mono text-[0.75rem]'>
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
          </ul>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

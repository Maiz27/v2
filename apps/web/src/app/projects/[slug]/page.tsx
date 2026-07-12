import { notFound } from 'next/navigation';
import Masthead from '@/components/layout/Masthead';
import SiteFooter from '@/components/layout/SiteFooter';
import Reveal from '@/components/motion/Reveal';
import Contents from '@/components/projects/Contents';
import RichTextParser from '@/components/RichTextParser/RichTextParser';
import ScrollProgress from '@/components/ui/ScrollProgress';
import JsonLd from '@/components/jsonLd/JsonLd';
import { projects } from '@/lib/data/projects';
import { getDomain, getMonthYear } from '@/lib/utilities';
import { buildMetadata } from '@/lib/metadata';
import { BASEURL } from '@/lib/Constants';
import { PersonSchema } from '@/lib/schema';
import { CreativeWork } from 'schema-dts';

export const revalidate = 60;

type Params = { [key: string]: string | undefined };

const page = async ({ params }: { params: Promise<Params> }) => {
  const { slug } = await params;
  const project = await projects.bySlug(slug!);

  if (!project) {
    return notFound();
  }

  const {
    title,
    contentTitle,
    href,
    source,
    description,
    date,
    status,
    tools,
    content,
  } = project;

  const stack = tools.map((t) => t.name).join(' / ');

  const projectJsonLd: CreativeWork = {
    '@type': 'CreativeWork',
    name: contentTitle || title,
    description,
    url: href || source || `${BASEURL}/projects/${slug}`,
    datePublished: date,
    author: PersonSchema,
  };

  return (
    <>
      <ScrollProgress />
      <div className='mx-auto max-w-6xl px-6 md:px-10'>
        <JsonLd schema={projectJsonLd} />

        <Masthead />

        <main>
        {/* Case header */}
        <Reveal as='section' className='draw-b-hair py-14 md:py-20'>
          <p
            className='ledger-load mb-5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-mark'
            style={{ '--i': 0 } as React.CSSProperties}
          >
            Case study &middot; {title}
          </p>
          <h1
            className='ledger-load font-display max-w-[24ch] text-[clamp(2.25rem,5vw,4rem)] font-black leading-[1.06] tracking-tight'
            style={{ '--i': 1 } as React.CSSProperties}
          >
            {contentTitle || title}
          </h1>
          <p
            className='ledger-load mt-6 max-w-[58ch] text-[1.125rem] leading-[1.7] text-ink-soft'
            style={{ '--i': 2 } as React.CSSProperties}
          >
            {description}
          </p>
          <dl className='mt-10 grid gap-x-10 gap-y-4 font-mono text-[0.75rem] sm:grid-cols-2 lg:grid-cols-4'>
            <div>
              <dt className='mb-1 text-[0.62rem] uppercase tracking-[0.18em] text-ink-faint'>
                Filed
              </dt>
              <dd className='capitalize'>
                {getMonthYear(date)} &middot; {status}
              </dd>
            </div>
            <div>
              <dt className='mb-1 text-[0.62rem] uppercase tracking-[0.18em] text-ink-faint'>
                Stack
              </dt>
              <dd>{stack}</dd>
            </div>
            {href && (
              <div>
                <dt className='mb-1 text-[0.62rem] uppercase tracking-[0.18em] text-ink-faint'>
                  Live
                </dt>
                <dd>
                  <a
                    href={href}
                    target='_blank'
                    rel='noreferrer noopener'
                    className='underline decoration-dotted underline-offset-4 hover:text-mark'
                  >
                    {getDomain(href)}
                  </a>
                </dd>
              </div>
            )}
            {source && (
              <div>
                <dt className='mb-1 text-[0.62rem] uppercase tracking-[0.18em] text-ink-faint'>
                  Source
                </dt>
                <dd>
                  <a
                    href={source}
                    target='_blank'
                    rel='noreferrer noopener'
                    className='underline decoration-dotted underline-offset-4 hover:text-mark'
                  >
                    {getDomain(source)}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </Reveal>

        <div className='gap-16 py-12 lg:grid lg:grid-cols-[11rem_minmax(0,1fr)]'>
          <Contents content={content!} />

          <article>
            <RichTextParser content={content!} />
          </article>
        </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
};

export default page;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = await projects.metadataFor(slug!);
  if (project) {
    const { slug: projectSlug, contentTitle, description, images, title } = project;

    return buildMetadata({
      title: `${contentTitle || title}`,
      description,
      path: `/projects/${projectSlug?.current}`,
      image: images ?? undefined,
      type: 'article',
    });
  }
}

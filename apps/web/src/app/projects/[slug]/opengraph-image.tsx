import { projects } from '@/lib/data/projects';
import { renderCaseStudyCard, renderSiteCard } from '@/lib/og/card';

// Keep this literal aligned with REVALIDATE_FALLBACK in @/lib/site (and the
// case-study page): Next 16 only extracts literal route config values.
export const revalidate = 86400;

export const alt = 'A case study by Maged Faiz';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type Params = { slug: string };

export default async function Image({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  // A failed read throws rather than falling back: this response is cached
  // for a day, and a generic card baked in for a real case study would stick.
  const project = await projects.metadataForOg(slug);

  // Unknown slug: a generic card beats a broken preview.
  if (!project) return renderSiteCard();

  return renderCaseStudyCard({
    title: project.title,
    heading: project.contentTitle || project.title,
    description: project.description,
    path: `/projects/${project.slug?.current ?? slug}`,
    imageUrl: project.images,
  });
}

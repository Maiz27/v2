import { notFound } from 'next/navigation';
import ShareContent from '@/components/share/ShareContent';
import ProjectHeader from '@/components/projects/ProjectHeader';
import RichTextParser from '@/components/RichTextParser/RichTextParser';
import { fetchSanityData } from '@/lib/sanity/client';
import { getProjectBySlug, getProjectMetadata } from '@/lib/sanity/queries';
import { Project } from '@/lib/types';
import { BASEURL } from '@/lib/Constants';

export const revalidate = 60;

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const project: Project = await fetchSanityData(getProjectBySlug, { slug });

  if (!project) {
    return notFound();
  }

  return (
    <main>
      <ProjectHeader project={project} />

      <RichTextParser content={project.content} />

      <ShareContent />
    </main>
  );
};

export default page;

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const project: Project = await fetchSanityData(getProjectMetadata, { slug });
  if (project) {
    const { slug, contentTitle, description, images } = project;
    const url = `${BASEURL}/projects/${slug.current}`;

    return {
      title: `${contentTitle}`,
      description: description,
      image: images,
      alternates: {
        canonical: url,
      },
      icons: {
        icon: '/imgs/logo/favicon.ico',
        shortcut: '/imgs/logo/favicon.ico',
        apple: '/imgs/logo/favicon.ico',
        other: {
          rel: 'apple-touch-icon-precomposed',
          url: '/imgs/logo/favicon.ico',
        },
      },
      openGraph: {
        type: 'article',
        url: url,
        title: contentTitle,
        description: description,
        siteName: contentTitle,
        images: [
          {
            url: images,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        site: url,
        images: [
          {
            url: images,
          },
        ],
      },
    };
  }
}

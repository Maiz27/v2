import { notFound } from 'next/navigation';
import ShareContent from '@/components/share/ShareContent';
import ProjectHeader from '@/components/projects/ProjectHeader';
import TableOfContents from '@/components/projects/TableOfContents';
import RichTextParser from '@/components/RichTextParser/RichTextParser';
import ScrollProgress from '@/components/ui/ScrollProgress';
import { fetchSanityData } from '@/lib/sanity/client';
import { getProjectBySlug, getProjectMetadata } from '@/lib/sanity/queries';
import { Project } from '@/lib/types';
import { BASEURL } from '@/lib/Constants';
import { CreativeWork } from 'schema-dts';
import { PersonSchema } from '@/app/page';
import JsonLd from '@/components/jsonLd/JsonLd';

export const revalidate = 60;

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const project: Project = await fetchSanityData(getProjectBySlug, { slug });

  if (!project) {
    return notFound();
  }

  const { title, href, source, description, date, content } = project;

  const projectJsonLd: CreativeWork = {
    '@type': 'CreativeWork',
    name: title,
    description: description,
    url: href || source || `${BASEURL}/projects/${slug}`,
    datePublished: date,
    author: PersonSchema,
  };

  return (
    <>
      <ScrollProgress />
      <>
        <JsonLd schema={projectJsonLd} />

        <ProjectHeader project={project} />

        <TableOfContents content={content} />

        <RichTextParser content={content} />

        <ShareContent />
      </>
    </>
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
      robots: {
        index: true,
        follow: true,
        'max-snippet': 50,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    };
  }
}

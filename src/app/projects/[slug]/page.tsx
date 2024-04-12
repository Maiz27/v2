import ShareContent from '@/components/share/ShareContent';
import ProjectHeader from '@/components/projects/ProjectHeader';
import RichTextParser from '@/components/RichTextParser/RichTextParser';
import { fetchSanityData } from '@/lib/sanity/client';
import { getProjectBySlug } from '@/lib/sanity/queries';
import { Project } from '@/lib/types';

export const revalidate = 60;

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const project: Project = await fetchSanityData(getProjectBySlug, { slug });

  return (
    <main>
      <ProjectHeader project={project} />

      <RichTextParser content={project.content} />

      <ShareContent />
    </main>
  );
};

export default page;

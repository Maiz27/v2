import Heading from '@/components/heading/Heading';
import EmptyState from '@/components/ui/EmptyState';
import ProjectsFilter from '@/components/projects/ProjectsFilter';
import AnimatedProjectsGrid from '@/components/projects/AnimatedProjectsGrid';
import { fetchSanityData } from '@/lib/sanity/client';
import { Project } from '@/lib/types';
import { HiOutlineLightBulb } from 'react-icons/hi2';
import { getPageMetadata } from '@/lib/utilities';

export const revalidate = 60;

export const metadata = getPageMetadata('projects');

const Projects = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const projects: Project[] = await fetchProjects(searchParams);
  const isEmpty = projects.length <= 0;

  return (
    <main className='min-h-screen'>
      <Heading
        Tag='h1'
        icon={<HiOutlineLightBulb />}
        heading='My Projects Showcase'
        paragraph='Explore the landscape of innovation and technology through my projects, each a testament to creative solutions and technical prowess.'
      >
        <ProjectsFilter projectsTotal={projects.length} />
      </Heading>

      {isEmpty ? (
        <EmptyState
          heading='No Projects Found'
          paragraph={
            "We couldn't find any projects matching your filters. Adjust your selections or reset the filters to explore all projects."
          }
        />
      ) : (
        <AnimatedProjectsGrid projects={projects} />
      )}
    </main>
  );
};

export default Projects;

const fetchProjects = async (
  searchParams: { [key: string]: string | string[] | undefined } = {}
) => {
  const { status, tech } = searchParams;
  const techArray = tech?.toString().split(',') ?? [];

  let query = '*[_type == "project"';
  let params: { [key: string]: string | string[] } = {};

  if (techArray.length > 0) {
    query += ' && tech[]->name match coalesce($tech, ".*")';
    params.tech = techArray;
  }

  if (status) {
    query += ' && status == $status';
    params.status = status;
  }

  query +=
    ']{ title, slug, featured, date, status, description, href, source, tech[]->{ name }, "images": images[].image.asset->url } | order(featured desc, date desc)';

  const projects: Project[] = await fetchSanityData(query, params);

  return projects;
};

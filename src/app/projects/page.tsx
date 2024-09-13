import Heading from '@/components/heading/Heading';
import EmptyState from '@/components/ui/EmptyState';
import ProjectsFilter from '@/components/projects/ProjectsFilter';
import AnimatedProjectsGrid from '@/components/projects/AnimatedProjectsGrid';
import { fetchSanityData } from '@/lib/sanity/client';
import { getPageMetadata } from '@/lib/utilities';
import { HiOutlineLightBulb } from 'react-icons/hi2';
import { Project } from '@/lib/types';

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
    <>
      <Heading
        Tag='h1'
        icon={<HiOutlineLightBulb />}
        heading='My Projects Showcase'
        paragraph='Explore the landscape of innovation and technology through my projects, each a testament to creative solutions and technical prowess.'
      >
        <ProjectsFilter projectsTotal={projects.length} />
      </Heading>

      <div className='min-h-[75dvh]'>
        {isEmpty ? (
          <EmptyState
            heading='No Projects Found'
            paragraph={
              "We couldn't find any projects matching your filters. Adjust your selections or reset the filters to explore all projects."
            }
          />
        ) : (
          <AnimatedProjectsGrid projects={[...projects]} />
        )}
      </div>
    </>
  );
};

export default Projects;

const fetchProjects = async (
  searchParams: { [key: string]: string | string[] | undefined } = {}
) => {
  const { status, tech } = searchParams;
  const techArray = tech?.toString().split(',').filter(Boolean) ?? [];

  let query = '*[_type == "project"';
  let params: { [key: string]: string | string[] | number } = {};

  if (!!techArray.length) {
    query += ' && count((tech[]->name)[@ in $tech]) > 0';
    params.tech = techArray;
  }

  if (status) {
    query += ' && status == $status';
    params.status = status;
  }

  query += `]{
    title,
    slug,
    featured,
    date,
    status,
    description,
    href,
    source,
    tech[]->{ name },
  } | order(featured desc, date desc)`;

  const projects: Project[] = await fetchSanityData(query, params);

  return projects;
};

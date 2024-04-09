import Heading from '@/components/heading/Heading';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectsFilter from '@/components/projects/ProjectsFilter';
import { fetchSanityData } from '@/lib/sanity/client';
import { Project } from '@/lib/types';
import { HiOutlineLightBulb } from 'react-icons/hi2';

export const revalidate = 60;

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
    ']{ title, featured, status, description, href, source, tech[]->{ name }, "images": images[].image.asset->url } | order(featured desc)';

  console.log(params.tech);
  console.log('query', query);

  const projects: Project[] = await fetchSanityData(query, params);

  return projects;
};

const page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const projects: Project[] = await fetchProjects(searchParams);

  return (
    <main>
      <Heading
        Tag='h1'
        icon={<HiOutlineLightBulb />}
        heading='My Projects'
        paragraph='Explore the landscape of innovation and technology through my projects, each a testament to creative solutions and technical prowess.'
      >
        <ProjectsFilter projectsTotal={projects.length} />
      </Heading>

      <section className='mb-10'>
        <div className='mt-10 grid place-items-center grid-cols-1 lg:grid-cols-2 gap-4'>
          {projects.map((project) => (
            <ProjectCard
              key={project.href}
              project={project}
              hasImage={false}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default page;

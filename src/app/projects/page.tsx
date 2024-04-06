import Heading from '@/components/heading/Heading';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectsFilter from '@/components/projects/ProjectsFilter';
import { PROJECTS } from '@/lib/Constants';
import { HiOutlineLightBulb } from 'react-icons/hi2';

const page = () => {
  return (
    <main>
      <Heading
        Tag='h1'
        icon={<HiOutlineLightBulb />}
        heading='My Projects'
        paragraph='Explore the landscape of innovation and technology through my projects, each a testament to creative solutions and technical prowess.'
      />

      <section className='mb-10'>
        <ProjectsFilter />

        <div className='mt-10 grid place-items-center grid-cols-1 lg:grid-cols-2 gap-4'>
          {PROJECTS.map((project, idx) => (
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

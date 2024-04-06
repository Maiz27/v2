import CTA from '@/components/CTA/CTA';
import Heading from '@/components/heading/Heading';
import ProjectCard from '@/components/projects/ProjectCard';
import { PROJECTS } from '@/lib/Constants';
import {
  HiOutlineRocketLaunch,
  HiOutlineSquare3Stack3D,
} from 'react-icons/hi2';

const Projects = () => {
  return (
    <section className='my-20'>
      <Heading
        icon={<HiOutlineRocketLaunch />}
        heading='Curated Works'
        paragraph='Showcasing a spectrum of projects that demonstrate technical prowess and a commitment to crafting impactful digital products.'
      />

      <div className='py-12 grid place-items-center grid-cols-1 lg:grid-cols-2 gap-6'>
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={project.href} project={project} />
        ))}
      </div>

      <CTA
        icon={<HiOutlineSquare3Stack3D />}
        text='All Projects'
        href='/portfolio'
      />
    </section>
  );
};

export default Projects;

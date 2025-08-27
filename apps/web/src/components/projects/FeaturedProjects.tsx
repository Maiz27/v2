import CTA from '@/components/CTA/CTA';
import Heading from '@/components/heading/Heading';
import EmptyState from '@/components/ui/EmptyState';
import ProjectCard from '@/components/projects/ProjectCard';
import { fetchSanityData } from '@/lib/sanity/client';
import { getFeaturedProjects } from '@/lib/sanity/queries';
import { HiOutlineSquare3Stack3D, HiOutlineStar } from 'react-icons/hi2';
import AnimateInView from '../animationWrappers/AnimateInView';
import { GetFeaturedProjectsResult } from '@/lib/sanity/types';

export const revalidate = 60;

const FeaturedProjects = async () => {
  const projects: GetFeaturedProjectsResult =
    await fetchSanityData(getFeaturedProjects);
  const isEmpty = projects.length <= 0;

  return (
    <section className='my-20'>
      <Heading
        icon={<HiOutlineStar />}
        heading='Featured Projects'
        paragraph='A curated selection of standout projects, demonstrating innovative solutions and creative excellence.'
      />

      {isEmpty ? (
        <EmptyState
          heading='No Featured Projects'
          paragraph={
            "Stay tuned! I'am preparing to showcase exciting projects here. Check back soon to explore my featured innovations."
          }
        />
      ) : (
        <div className='py-12 grid place-items-center grid-cols-1 lg:grid-cols-2 gap-6'>
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.href}
              project={project}
              index={idx}
              featured={true}
            />
          ))}
        </div>
      )}

      <AnimateInView>
        <CTA
          icon={<HiOutlineSquare3Stack3D />}
          text='All Projects'
          href='/projects'
        />
      </AnimateInView>
    </section>
  );
};

export default FeaturedProjects;

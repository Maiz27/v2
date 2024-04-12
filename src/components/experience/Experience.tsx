import Heading from '@/components/heading/Heading';
import EmptyState from '@/components/ui/EmptyState';
import ExperienceCard from '@/components/experience/ExperienceCard';
import { getExperiences } from '@/lib/sanity/queries';
import { fetchSanityData } from '@/lib/sanity/client';
import { Experience as ExperienceType } from '@/lib/types';
import { HiOutlineBriefcase } from 'react-icons/hi2';

export const revalidate = 60;

const Experience = async () => {
  const experience: ExperienceType[] = await fetchSanityData(getExperiences);
  const isEmpty = experience.length <= 0;

  return (
    <section className='mt-20'>
      <Heading
        icon={<HiOutlineBriefcase />}
        heading='Professional Journey'
        paragraph='A chronicle of dedication and innovation across various tech landscapes, delivering exceptional solutions that drive growth.'
      />

      {isEmpty ? (
        <EmptyState
          heading='Experience Details Coming Soon'
          paragraph={
            "I'm in the process of curating my professional experiences to share with you. Please check back soon to discover the roles and projects that have shaped my career."
          }
        />
      ) : (
        <div className='flex flex-col space-y-6 py-12'>
          {experience.map((e, idx) => (
            <ExperienceCard key={idx} experience={e} index={idx} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Experience;

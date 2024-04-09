import Heading from '@/components/heading/Heading';
import ExperienceCard from '@/components/experience/ExperienceCard';
import { getExperiences } from '@/lib/sanity/queries';
import { fetchSanityData } from '@/lib/sanity/client';
import { Experience as ExperienceType } from '@/lib/types';
import { HiOutlineBriefcase } from 'react-icons/hi2';

export const revalidate = 60;

const Experience = async () => {
  const experience: ExperienceType[] = await fetchSanityData(getExperiences);

  console.log(experience);
  return (
    <section className='mt-20'>
      <Heading
        icon={<HiOutlineBriefcase />}
        heading='Professional Journey'
        paragraph='A chronicle of dedication and innovation across various tech landscapes, delivering exceptional solutions that drive growth.'
      />

      <div className='flex flex-col space-y-6 py-12'>
        {experience.map((e, idx) => (
          <ExperienceCard key={idx} experience={e} />
        ))}
      </div>
    </section>
  );
};

export default Experience;

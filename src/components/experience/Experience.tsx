import Heading from '@/components/heading/Heading';
import ExperienceCard from '@/components/experience/ExperienceCard';
import { EXPERIENCE } from '@/lib/Constants';
import { HiOutlineBriefcase } from 'react-icons/hi2';

const Experience = () => {
  return (
    <section className='mt-20'>
      <Heading
        icon={<HiOutlineBriefcase />}
        heading='My Experience'
        paragraph='Navigating diverse environments with adaptability and expertise for holistic solutions.'
      />

      <div className='flex flex-col space-y-6 py-12'>
        {EXPERIENCE.map((e, idx) => (
          <ExperienceCard key={idx} item={e} />
        ))}
      </div>
    </section>
  );
};

export default Experience;

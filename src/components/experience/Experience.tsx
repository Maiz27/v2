import Heading from '@/components/heading/Heading';
import ExperienceCard from '@/components/experience/ExperienceCard';
import { EXPERIENCE } from '@/lib/Constants';
import { HiOutlineBriefcase } from 'react-icons/hi2';

const Experience = () => {
  return (
    <section className='mt-20'>
      <Heading
        icon={<HiOutlineBriefcase />}
        heading='Professional Journey'
        paragraph='A chronicle of dedication and innovation across various tech landscapes, delivering exceptional solutions that drive growth.'
      />

      <div className='flex flex-col space-y-6 py-12'>
        {EXPERIENCE.map((e, idx) => (
          <ExperienceCard key={idx} experience={e} />
        ))}
      </div>
    </section>
  );
};

export default Experience;

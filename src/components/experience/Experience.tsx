import Heading from '@/components/heading/Heading';
import { EXPERIENCE } from '@/lib/Constants';
import { FaUserTie } from 'react-icons/fa6';
import ExperienceCard from './ExperienceCard';

const Experience = () => {
  return (
    <section className='py-20'>
      <div className='space-y-6 border-b border-copy/10 py-6'>
        <Heading icon={<FaUserTie />} text='My Experience' />
        <p>
          Navigating diverse environments with adaptability and expertise for
          holistic solutions.
        </p>
      </div>

      <div className='flex flex-col space-y-6 py-12'>
        {EXPERIENCE.map((e, idx) => (
          <ExperienceCard key={idx} item={e} />
        ))}
      </div>
    </section>
  );
};

export default Experience;

import Heading from '@/components/heading/Heading';
import HoverStrips from '../hoverStrips/HoverStrips';
import { SERVICES } from '@/lib/Constants';
import { HiOutlineBolt } from 'react-icons/hi2';

const Services = () => {
  return (
    <section className='mt-20'>
      <Heading
        icon={<HiOutlineBolt />}
        heading='My Services'
        paragraph='Formulating comprehensive strategies to meet your development goals
            and exceed expectations.'
      />

      <div className='py-12 grid place-items-center grid-cols-1 lg:grid-cols-2 gap-6'>
        {SERVICES.map((e, idx) => (
          <div
            key={idx}
            className='w-full bg-foreground/50 rounded-lg p-6 border border-copy/10 relative group overflow-hidden'
          >
            <HoverStrips bottom='-bottom-36' />
            <div className='flex items-center gap-2 relative z-10'>
              <span className='text-3xl rounded-lg p-4 border border-copy/10 opacity-100'>
                {e.icon}
              </span>
              <h3 className='text-2xl lg:text-xl w-full'>{e.title}</h3>
            </div>

            <p className='text-sm xl:text-base relative z-10 mt-4'>
              {e.paragraph}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;

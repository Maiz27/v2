import Heading from '@/components/heading/Heading';
import HoverStrips from '../hoverStrips/HoverStrips';
import { BENEFITS, SERVICES } from '@/lib/Constants';
import { HiOutlineBolt, HiOutlineCheckCircle } from 'react-icons/hi2';

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
              <span className='text-3xl rounded-lg p-4 border border-copy/10 opacity-100 group-hover:text-primary group-hover:border-primary transition-colors'>
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

      <div className='mx-auto space-y-4'>
        <h3 className='text-center'>Benefits in Services</h3>

        <div
          className='flex overflow-hidden bg-foreground'
          style={{
            maskImage:
              'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)',
          }}
        >
          <div className='flex h-full animate-[slide_180s_linear_infinite] py-4'>
            <ul className='flex space-x-8 opacity-70 '>
              {BENEFITS.map((name) => (
                <li key={name} className='flex items-center space-x-2 text-3xl'>
                  <HiOutlineCheckCircle className='text-primary' />
                  <span className='text-base w-max opacity-100'>{name}</span>
                </li>
              ))}
              {BENEFITS.map((name, idx) => (
                <li
                  key={`${name}-duplicate`}
                  className='flex items-center space-x-2 text-3xl'
                >
                  <HiOutlineCheckCircle className='text-primary' />
                  <span className='text-base w-max opacity-100'>{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

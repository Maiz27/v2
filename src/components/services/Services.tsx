import Heading from '@/components/heading/Heading';
import BaseCard from '@/components/ui/BaseCard';
import { BENEFITS, SERVICES } from '@/lib/Constants';
import { HiOutlineBolt, HiOutlineCheckCircle } from 'react-icons/hi2';
import AnimateInView from '../animationWrappers/AnimateInView';
import TranslateWrapper from '../animationWrappers/TranslateWrapper';

const Services = () => {
  return (
    <section className='mt-20'>
      <Heading
        icon={<HiOutlineBolt />}
        heading='Expertise Offered'
        paragraph='Crafting tailor-made digital experiences with a blend of creativity, latest technology, and strategic insights to propel your business forward.'
      />

      <div className='py-12 grid place-items-center grid-cols-1 lg:grid-cols-2 gap-6'>
        {SERVICES.map((e, idx) => (
          <BaseCard delay={0.6 * idx} key={idx} hoverStripsBottom='-bottom-36'>
            <div className='flex items-center gap-2 relative z-10'>
              <span className='text-3xl rounded-lg p-4 border border-border opacity-100 group-hover:text-primary group-hover:border-primary transition-colors'>
                {e.icon}
              </span>
              <h3 className='text-2xl lg:text-xl w-full'>{e.title}</h3>
            </div>

            <AnimateInView
              delay={0.6}
              tag='p'
              className='text-sm xl:text-base relative z-10 mt-4'
            >
              {e.paragraph}
            </AnimateInView>
          </BaseCard>
        ))}
      </div>

      <AnimateInView delay={1} className='mx-auto space-y-4 pb-10'>
        <h3 className='text-center'>Benefits in Services</h3>

        <div
          className='flex overflow-hidden bg-foreground'
          style={{
            maskImage:
              'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)',
          }}
        >
          <TranslateWrapper tag='ul' className='opacity-70 py-4'>
            <>
              {BENEFITS.map((name) => (
                <li key={name} className='flex items-center space-x-2 text-3xl'>
                  <HiOutlineCheckCircle className='text-primary' />
                  <span className='text-base w-max opacity-100'>{name}</span>
                </li>
              ))}
            </>
          </TranslateWrapper>
          <TranslateWrapper tag='ul' className='opacity-70 py-4'>
            <>
              {BENEFITS.map((name) => (
                <li key={name} className='flex items-center space-x-2 text-3xl'>
                  <HiOutlineCheckCircle className='text-primary' />
                  <span className='text-base w-max opacity-100'>{name}</span>
                </li>
              ))}
            </>
          </TranslateWrapper>
        </div>
      </AnimateInView>
    </section>
  );
};

export default Services;

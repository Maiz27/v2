import AnimateInView from '../animationWrappers/AnimateInView';
import CTA from '../CTA/CTA';
import Heading from '../heading/Heading';
import { ROUTES } from '@/lib/Constants';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi2';

export const Default404 = () => {
  return (
    <>
      <div className='min-h-[75dvh]'>
        <Heading
          Tag='h1'
          icon={<HiOutlineQuestionMarkCircle />}
          heading='Page Not Found'
          paragraph={`Oops! It looks like you\'ve ventured into uncharted territory. While the page you\'re looking for doesn\'t exist, you can explore my projects or get in touch to find what you need.`}
        />

        <div className='w-full flex flex-col lg:flex-row items-center gap-2 lg:gap-4 mt-4'>
          {ROUTES.map(({ icon, name, href }) => (
            <AnimateInView key={href} delay={1.4} className='w-full'>
              <CTA text={name} href={href} external={true} icon={icon} />
            </AnimateInView>
          ))}
        </div>
      </div>
    </>
  );
};

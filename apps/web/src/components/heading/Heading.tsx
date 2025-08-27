import { JSX, ReactNode } from 'react';
import AnimateInView from '../animationWrappers/AnimateInView';
import { SLIDE_LEFT } from '@/lib/Constants';

type props = {
  icon: JSX.Element;
  heading: string;
  paragraph?: string;
  Tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl';
  children?: ReactNode;
};

const Heading = ({
  heading,
  paragraph,
  icon,
  Tag = 'h2',
  size = '4xl',
  children,
}: props) => {
  return (
    <AnimateInView className='space-y-6 border-b border-border py-6'>
      <Tag className='flex lg:items-center gap-2'>
        <AnimateInView tag='span' delay={0.8} className='opacity-100 text-3xl'>
          {icon}
        </AnimateInView>
        <AnimateInView
          tag='span'
          initial={SLIDE_LEFT.initial}
          whileInView={SLIDE_LEFT.whileInView}
          className={`opacity-100 text-3xl lg:text-${size}`}
        >
          {heading}
        </AnimateInView>
      </Tag>
      {paragraph && (
        <AnimateInView tag='p' delay={1}>
          {paragraph}
        </AnimateInView>
      )}
      {children}
    </AnimateInView>
  );
};

export default Heading;

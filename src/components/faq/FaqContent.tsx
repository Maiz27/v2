'use client';
import FaqCard from './FaqCard';
import AnimateInView from '../animationWrappers/AnimateInView';
import { Faq } from '@/lib/types';

const FaqContent = ({ faqs }: { faqs: Faq[] }) => {
  const firstHalf: Faq[] = [];
  const secondHalf: Faq[] = [];

  faqs.forEach((faq, index) => {
    if (index % 2 === 0) {
      firstHalf.push(faq);
    } else {
      secondHalf.push(faq);
    }
  });

  return (
    <AnimateInView
      delay={1}
      threshold={0.15}
      className='w-full flex basis-auto mt-10 flex-wrap lg:flex-nowrap gap-4'
    >
      <div className='flex-1 h-min flex flex-col place-content-center items-center gap-4'>
        {firstHalf.map(({ question, answer }, index) => (
          <FaqCard key={index} question={question} answer={answer} />
        ))}
      </div>
      <div className='flex-1 h-min flex flex-col place-content-center items-center gap-4'>
        {secondHalf.map(({ question, answer }, index) => (
          <FaqCard key={index} question={question} answer={answer} />
        ))}
      </div>
    </AnimateInView>
  );
};

export default FaqContent;

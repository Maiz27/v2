'use client';
import FaqCard from './FaqCard';
import AnimateInView from '../animationWrappers/AnimateInView';
import useWindowWidth from '@/lib/hooks/useWindowWidth';
import { GetFaqsResult } from '@/lib/sanity/types';

const FaqContent = ({ faqs }: { faqs: GetFaqsResult }) => {
  const width = useWindowWidth();
  const isDesktop = width >= 768;

  const renderFaqCards = (faqList: GetFaqsResult) => (
    <div className='flex-1 h-min flex flex-col place-content-center items-center gap-4'>
      {faqList.map(({ question, answer }, index) => (
        <FaqCard key={index} question={question} answer={answer} />
      ))}
    </div>
  );

  const desktopLayout = (
    <>
      {renderFaqCards(faqs.filter((_, index) => index % 2 === 0))}
      {renderFaqCards(faqs.filter((_, index) => index % 2 !== 0))}
    </>
  );

  const mobileLayout = renderFaqCards(faqs);

  return (
    <AnimateInView
      delay={1}
      threshold={0.15}
      className='w-full flex basis-auto mt-10 flex-col md:flex-row gap-4'
    >
      {isDesktop ? desktopLayout : mobileLayout}
    </AnimateInView>
  );
};

export default FaqContent;

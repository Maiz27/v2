import FaqCard from './FaqCard';
import Heading from '@/components/heading/Heading';
import EmptyState from '@/components/ui/EmptyState';
import { fetchSanityData } from '@/lib/sanity/client';
import { getFaqs } from '@/lib/sanity/queries';
import { Faq } from '@/lib/types';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi2';

export const revalidate = 60;

const Faqs = async () => {
  const faqs: Faq[] = await fetchSanityData(getFaqs);
  const isEmpty = faqs.length <= 0;

  const content = () => {
    const midIndex = Math.ceil(faqs.length / 2);
    const firstHalf = faqs.slice(0, midIndex);
    const secondHalf = faqs.slice(midIndex);

    return (
      <div className='w-full flex basis-auto mt-10 flex-wrap lg:flex-nowrap gap-4'>
        <div className='h-min flex flex-col place-content-center items-center gap-4'>
          {firstHalf.map(({ question, answer }, index) => (
            <FaqCard key={index} question={question} answer={answer} />
          ))}
        </div>
        <div className='h-min flex flex-col place-content-center items-center gap-4'>
          {secondHalf.map(({ question, answer }, index) => (
            <FaqCard key={index} question={question} answer={answer} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className='my-20'>
      <Heading
        icon={<HiOutlineQuestionMarkCircle />}
        heading='Common Queries'
        paragraph='Get Answers to Common Queries. Your Questions, Addressed Simply.'
      />
      {isEmpty ? (
        <EmptyState
          heading='FAQs Coming Soon'
          paragraph={
            "I'm gathering the most common questions to help you get the answers you need. Check back soon for insights and information to guide your experience."
          }
        />
      ) : (
        content()
      )}
    </section>
  );
};

export default Faqs;

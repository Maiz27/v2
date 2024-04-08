import FaqCard from './FaqCard';
import Heading from '../heading/Heading';
import { FAQS } from '@/lib/Constants';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi2';

const Faqs = () => {
  const midIndex = Math.ceil(FAQS.length / 2);
  const firstHalf = FAQS.slice(0, midIndex);
  const secondHalf = FAQS.slice(midIndex);

  return (
    <section className='my-20'>
      <Heading
        icon={<HiOutlineQuestionMarkCircle />}
        heading='Common Queries'
        paragraph='Get Answers to Common Queries. Your Questions, Addressed Simply.'
      />

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
    </section>
  );
};

export default Faqs;

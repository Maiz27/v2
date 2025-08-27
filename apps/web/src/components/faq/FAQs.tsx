import { FAQPage } from 'schema-dts';
import JsonLd from '../jsonLd/JsonLd';
import Heading from '@/components/heading/Heading';
import EmptyState from '@/components/ui/EmptyState';
import { fetchSanityData } from '@/lib/sanity/client';
import FaqContent from './FaqContent';
import { getFaqs } from '@/lib/sanity/queries';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi2';
import { GetFaqsResult } from '@/lib/sanity/types';

export const revalidate = 60;

const FAQs = async () => {
  const faqs: GetFaqsResult = await fetchSanityData(getFaqs);
  const isEmpty = faqs.length <= 0;

  const faqJsonLd: FAQPage = {
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };

  return (
    <section className='my-20'>
      <JsonLd schema={faqJsonLd} />
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
        <FaqContent faqs={faqs} />
      )}
    </section>
  );
};

export default FAQs;

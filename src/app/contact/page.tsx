import CTA from '@/components/CTA/CTA';
import Faqs from '@/components/faq/Faqs';
import Heading from '@/components/heading/Heading';
import ContactForm from '@/components/forms/ContactForm';
import { HiOutlineEnvelope, HiOutlineSquare3Stack3D } from 'react-icons/hi2';

const page = () => {
  return (
    <main>
      <Heading
        icon={<HiOutlineEnvelope />}
        heading={`Let's Connect & Create!`}
        paragraph={`Connect with Me Today. Let's Create Something Amazing Together!`}
      >
        <div className='w-full xl:w-1/2 flex flex-col lg:flex-row items-center gap-2 lg:gap-4'>
          <CTA
            text='Email Me'
            href='mailto:email@me.com'
            external={true}
            icon={<HiOutlineEnvelope />}
          />
          <CTA
            text='My Projects'
            href='/portfolio'
            icon={<HiOutlineSquare3Stack3D />}
          />
        </div>
      </Heading>

      <ContactForm />

      <Faqs />
    </main>
  );
};

export default page;

import CTA from '@/components/CTA/CTA';
import Faqs from '@/components/faq/Faqs';
import Heading from '@/components/heading/Heading';
import ContactForm from '@/components/forms/ContactForm';
import { HiOutlineEnvelope, HiOutlineSquare3Stack3D } from 'react-icons/hi2';
import { EMAIL } from '@/lib/Constants';
import AnimateInView from '@/components/animationWrappers/AnimateInView';

export const revalidate = 60;

const page = () => {
  return (
    <main>
      <Heading
        Tag='h1'
        icon={<HiOutlineEnvelope />}
        heading='Start a Conversation'
        paragraph="Interested in collaborating? Reach out and let's turn your vision into digital reality. I'm just a message away!"
      >
        <div className='w-full xl:w-1/2 flex flex-col lg:flex-row items-center gap-2 lg:gap-4'>
          <AnimateInView delay={1.4} className='w-full'>
            <CTA
              text='Email Me'
              href={`mailto:${EMAIL}`}
              external={true}
              icon={<HiOutlineEnvelope />}
            />
          </AnimateInView>
          <AnimateInView delay={1.8} className='w-full'>
            <CTA
              text='My Projects'
              href='/projects'
              icon={<HiOutlineSquare3Stack3D />}
            />
          </AnimateInView>
        </div>
      </Heading>

      <ContactForm />

      <Faqs />
    </main>
  );
};

export default page;

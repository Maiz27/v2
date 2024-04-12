'use client';
import CTA from '../CTA/CTA';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';
import AnimateInView from '../animationWrappers/AnimateInView';

const ContactForm = () => {
  return (
    <section className='mt-10'>
      <form className='space-y-4'>
        <AnimateInView
          delay={2}
          className='grid place-items-center grid-cols-2 gap-2'
        >
          <input placeholder='Name' type='name' />
          <input placeholder='Email' type='email' />
        </AnimateInView>
        <AnimateInView delay={2}>
          <textarea className='h-64 resize-y' placeholder='Message' />
        </AnimateInView>
        <AnimateInView threshold={1} className='w-full'>
          <CTA
            icon={<HiOutlineArrowUpRight />}
            text='Send Message'
            onClick={() => {}}
            type='submit'
          />
        </AnimateInView>
      </form>
    </section>
  );
};

export default ContactForm;

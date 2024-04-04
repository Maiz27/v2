'use client';
import CTA from '../CTA/CTA';

const ContactForm = () => {
  return (
    <section className='mt-10'>
      <form className='space-y-4'>
        <div className='grid place-items-center grid-cols-2 gap-2'>
          <input placeholder='Name' type='name' />
          <input placeholder='Email' type='email' />
        </div>
        <textarea className='h-52 resize-y' placeholder='Message' />
        <CTA text='Send Your Message' onClick={() => {}} type='submit' />
      </form>
    </section>
  );
};

export default ContactForm;

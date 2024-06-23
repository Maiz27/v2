'use client';
import CTA from '../CTA/CTA';
import AnimateInView from '../animationWrappers/AnimateInView';
import useForm from '@/lib/hooks/useForm';
import { FORMS } from '@/lib/Constants';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';
import Input from '../ui/form/Input';
import Textarea from '../ui/form/Textarea';

const ContactForm = () => {
  const { fields, rules } = FORMS.contact;
  const { state, errors, loading, handleChange, reset, onSubmit } = useForm(
    fields,
    rules
  );

  const handleSubmit = async () => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    });
    console.log('response', response);

    reset();
  };

  return (
    <section className='mt-10'>
      <form onSubmit={(e) => onSubmit(e, handleSubmit)} className='space-y-4'>
        <AnimateInView
          delay={2}
          className='grid place-items-center grid-cols-2 gap-2'
        >
          <Input
            name='name'
            placeholder='Name'
            type='name'
            state={state}
            errors={errors}
            onChange={handleChange}
          />
          <Input
            name='email'
            placeholder='Email'
            type='email'
            state={state}
            errors={errors}
            onChange={handleChange}
          />
        </AnimateInView>
        <AnimateInView delay={2}>
          <Textarea
            name='message'
            placeholder='Message'
            state={state}
            errors={errors}
            onChange={handleChange}
          />
        </AnimateInView>
        <AnimateInView threshold={1} className='w-full'>
          <CTA
            icon={<HiOutlineArrowUpRight />}
            text='Send Message'
            onClick={() => {}}
            type='submit'
            loading={loading}
          />
        </AnimateInView>
      </form>
    </section>
  );
};

export default ContactForm;

'use client';
import CTA from '../CTA/CTA';
import AnimateInView from '@/components/animationWrappers/AnimateInView';
import Input from '@/components/ui/form/Input';
import Textarea from '@/components/ui/form/Textarea';
import useForm from '@/lib/hooks/useForm';
import { FORMS } from '@/lib/Constants';
import { useToast } from '@/lib/context/ToastContext';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';

const ContactForm = () => {
  const { show } = useToast();

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

    if (response.status === 200) {
      show('Your Message was delivered successfully!', {
        status: 'success',
      });
    } else {
      show('An error occurred while delivering your Message!', {
        status: 'error',
      });
    }
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

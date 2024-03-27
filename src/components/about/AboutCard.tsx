import Image from 'next/image';
import CTA from '../CTA/CTA';
import { FaRegStar, FaRegEnvelope } from 'react-icons/fa6';

const AboutCard = () => {
  return (
    <section className='flex flex-col lg:flex-row justify-center items-start lg:items-center gap-4'>
      <div className='flex justify-center items-center gap-4'>
        <div className='size-32 lg:size-60 xl:size-72 2xl:size-80 overflow-hidden rounded-lg'>
          <Image
            src='/imgs/avatar.webp'
            alt='avatar'
            width={500}
            height={500}
            className='object-cover'
          />
        </div>
        <div className='lg:hidden'>
          <span className='opacity-70'>Hello I Am</span>
          <h1 className='font-bold text-3xl'>Maged Faiz</h1>
        </div>
      </div>
      <div className='space-y-4'>
        <div className='hidden lg:block'>
          <span className='opacity-70'>Hello I Am</span>
          <h1 className='font-bold text-3xl'>Maged Faiz</h1>
        </div>
        <p>
          Experienced web developer from Juba, South Sudan, with a passion for
          crafting seamless digital experiences and a proven track record.
        </p>
        <div className='flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-4'>
          <CTA
            text='Email Me'
            href='mailto:email@me.com'
            external={true}
            icon={<FaRegEnvelope />}
          />
          <CTA text='My Services' href='/services' icon={<FaRegStar />} />
        </div>
      </div>
    </section>
  );
};

export default AboutCard;

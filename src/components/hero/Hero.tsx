'use client';
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { heroBackgroundText } from '@/Constants';

const Hero = () => {
  return (
    <section className='h-screen overflow-hidden'>
      <TextArea />
      <WatermarkWrapper />
    </section>
  );
};

const TextArea = () => {
  return (
    <div className='absolute bottom-20 left-0 right-0 z-[999999]'>
      <div className='mx-auto flex max-w-7xl items-end justify-between p-4 md:p-8'>
        <div>
          <h1 className='mb-6 max-w-5xl text-6xl font-black leading-[1.1] md:text-8xl'>
            Innovating Web & Mobile
            <span className='text-primary'> Experiences</span>
          </h1>
          <p className='max-w-2xl md:text-lg text-balance'>
            Hello, I&apos;m{' '}
            <span className='text-primary font-bold'>Maged Faiz Ismail</span>, a
            software engineer from Juba, South Sudan. I specialize in responsive
            web and mobile solutions, blending advanced technology with creative
            design. Interested in tech collaborations or a chat? Let&apos;s{' '}
            <button className='text-primary underline font-medium'>
              Connect
            </button>{' '}
            and bring ideas to life!
          </p>
        </div>
      </div>
    </div>
  );
};

const WatermarkWrapper = () => {
  return (
    <>
      {heroBackgroundText.map((text, idx) => (
        <Watermark key={text} text={text} reverse={idx % 2 === 0} />
      ))}
    </>
  );
};

const Watermark = ({ reverse, text }: { reverse?: boolean; text: string }) => (
  <div className='flex -translate-y-12 select-none overflow-hidden'>
    <TranslateWrapper reverse={reverse}>
      <span className='w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-slate-300 dark:text-slate-700'>
        {text}
      </span>
    </TranslateWrapper>
    <TranslateWrapper reverse={reverse}>
      <span className='ml-48 w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-slate-300 dark:text-slate-700'>
        {text}
      </span>
    </TranslateWrapper>
  </div>
);

const TranslateWrapper = ({
  children,
  reverse,
}: {
  children: ReactNode;
  reverse?: boolean;
}) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? '-100%' : '0%' }}
      animate={{ translateX: reverse ? '0%' : '-100%' }}
      transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
      className='flex'
    >
      {children}
    </motion.div>
  );
};

export default Hero;

'use client';
import { useState, useEffect } from 'react';
import AnimatedIconCTA from '../CTA/AnimatedIconCTA';
import AnimateInView from '../animationWrappers/AnimateInView';
import { HiMiniArrowUp } from 'react-icons/hi2';

const ScrollToTop = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <AnimatedIconCTA
      Icon={<HiMiniArrowUp className='text-primary' />}
      name='Go top'
      onClick={handleScrollToTop}
      direction='y'
    />
  );
};

export default ScrollToTop;

export const MobileScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (isVisible)
    return (
      <AnimateInView
        tag='button'
        title='Scroll to top'
        onClick={scrollToTop}
        className='z-30 fixed xl:hidden bottom-4 right-4 p-2 shadow-xl rounded-xl btn btn-secondary border-2 border-primary text-xl'
      >
        <HiMiniArrowUp />
      </AnimateInView>
    );
};

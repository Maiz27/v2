'use client';
import AnimatedIconCTA from '../CTA/AnimatedIconCTA';
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

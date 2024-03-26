'use client';
import AnimatedIconCTA from '../CTA/AnimatedIconCTA';
import { FaArrowUp } from 'react-icons/fa6';

const ScrollToTop = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <AnimatedIconCTA
      Icon={<FaArrowUp />}
      name='Go top'
      onClick={handleScrollToTop}
      direction='y'
    />
  );
};

export default ScrollToTop;

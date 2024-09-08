import React from 'react';

// Needs TailwindCSS animation & keyframes setup
const ScrollProgress = () => {
  return (
    <div
      className='fixed top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/60 to-primary z-50 animate-scroll-progress rounded-2xl border border-white'
      style={{ animationTimeline: 'scroll()' }}
    ></div>
  );
};

export default ScrollProgress;

'use client';
import { BaseAnimationWrapperProps } from '@/lib/types';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const BoxesReveal = ({
  children,
  className,
  threshold = 0.4,
  once = true,
}: BaseAnimationWrapperProps) => {
  const [boxes, setBoxes] = useState<Array<number>>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Create an array of 100 numbers (for 100 boxes)
    setBoxes(Array.from({ length: 100 }, (_, i) => i));
    // Set the image to visible after the grid is rendered
    setIsVisible(true);
  }, []);

  return (
    <div className={`relative h-full ${className}`}>
      <div className='absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none'>
        {boxes.map((box) => (
          <motion.div
            key={box}
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 0 }}
            transition={{ delay: Math.random() * 2, duration: 1 }}
            viewport={{ amount: threshold, once }}
            className='bg-background z-10'
          />
        ))}
      </div>
      <div
        className={`h-full w-full ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {children}
      </div>
    </div>
  );
};

export default BoxesReveal;

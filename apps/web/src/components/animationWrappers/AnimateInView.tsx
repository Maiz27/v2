'use client';
import { motion, useInView } from 'framer-motion';
import { BaseAnimationWrapperProps } from '@/lib/types';
import { useRef } from 'react';
import { FADE_IN_UP } from '@/lib/Constants';

const AnimateInView = ({
  children,
  threshold = 0.4,
  delay = 0.4,
  tag = 'div',
  variants = FADE_IN_UP,
  once = true,
  duration = 0.5,
  ...rest
}: BaseAnimationWrapperProps) => {
  const MotionComponent = motion[tag];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: once, amount: threshold });

  return (
    <MotionComponent
      ref={ref}
      variants={variants}
      initial='initial'
      whileInView={isInView ? 'whileInView' : undefined}
      transition={{
        delay: delay,
        duration,
      }}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
};

export default AnimateInView;

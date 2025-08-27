'use client';
import { motion } from 'framer-motion';
import { BaseAnimationWrapperProps } from '@/lib/types';

const AnimateInView = ({
  children,
  threshold = 0.4,
  delay = 0.4,
  tag = 'div',
  initial = { opacity: 0, y: 15 },
  whileInView = { opacity: 1, y: 0 },
  once = true,
  duration = 0.5,
  ...rest
}: BaseAnimationWrapperProps) => {
  const MotionComponent = motion[tag];

  return (
    <MotionComponent
      initial={initial as any}
      whileInView={whileInView}
      transition={{
        delay: delay,
        duration,
      }}
      viewport={{ amount: threshold, once: once }}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
};

export default AnimateInView;

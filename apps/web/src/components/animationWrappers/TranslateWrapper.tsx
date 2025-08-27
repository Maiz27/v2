'use client';
import { JSX } from 'react';
import { motion } from 'framer-motion';
import { MotionTag } from '@/lib/types';

const TranslateWrapper = ({
  tag = 'div',
  children,
  reverse,
  className,
}: {
  tag?: MotionTag;
  children: JSX.Element;
  reverse?: boolean;
  className?: string;
}) => {
  const MotionComponent = motion[tag];
  return (
    <MotionComponent
      initial={{ translateX: reverse ? '-100%' : '0%' }}
      animate={{ translateX: reverse ? '0%' : '-100%' }}
      transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      className={`flex px-4 space-x-8 ${className}`}
    >
      {children}
    </MotionComponent>
  );
};

export default TranslateWrapper;

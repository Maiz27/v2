import { ReactNode } from 'react';
import { Variants } from 'framer-motion';

export type BaseAnimationWrapperProps = {
  children: ReactNode;
  threshold?: number;
  delay?: number;
  tag?: MotionTag;
  variants?: Variants | undefined;
  once?: boolean;
  duration?: number;
  [x: string]: any;
};

export type TOAST_STATUS = 'success' | 'error' | 'info' | 'warning';

export type MotionTag =
  | 'main'
  | 'nav'
  | 'div'
  | 'section'
  | 'article'
  | 'ul'
  | 'a'
  | 'form'
  | 'span'
  | 'aside'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'button';

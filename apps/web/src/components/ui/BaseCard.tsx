import { HTMLAttributes, ReactNode } from 'react';
import HoverStrips from './HoverStrips';
import AnimateInView from '../animationWrappers/AnimateInView';
import { BaseAnimationWrapperProps } from '@/lib/types';

type Props = {
  children: ReactNode;
  className?: string;
  hasHoverStrips?: boolean;
  hoverStripsBottom?: string;
} & HTMLAttributes<HTMLDivElement> &
  BaseAnimationWrapperProps;

const BaseCard = ({
  className,
  hasHoverStrips = true,
  hoverStripsBottom = '-bottom-28',
  children,
  ...additional
}: Props) => {
  return (
    <AnimateInView
      className={`w-full bg-foreground/50 rounded-lg p-6 border border-border relative group overflow-hidden ${className}`}
      {...additional}
    >
      {hasHoverStrips ? <HoverStrips bottom={hoverStripsBottom} /> : null}
      <div className='w-full h-full z-10 relative'>{children}</div>
    </AnimateInView>
  );
};

export default BaseCard;

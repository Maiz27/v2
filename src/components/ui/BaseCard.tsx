import { HTMLAttributes, ReactNode } from 'react';
import HoverStrips from './HoverStrips';

type Props = {
  children: ReactNode;
  className?: string;
  hasHoverStrips?: boolean;
  hoverStripsBottom?: string;
} & HTMLAttributes<HTMLDivElement>;

const BaseCard = ({
  className,
  hasHoverStrips = true,
  hoverStripsBottom = '-bottom-28',
  children,
  ...additional
}: Props) => {
  return (
    <div
      className={`w-full bg-foreground/50 rounded-lg p-6 border border-copy/10 relative group overflow-hidden ${className}`}
      {...additional}
    >
      {hasHoverStrips ? <HoverStrips bottom={hoverStripsBottom} /> : null}
      <div className='w-full h-full z-10 relative'>{children}</div>
    </div>
  );
};

export default BaseCard;

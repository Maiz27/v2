'use client';
import Link from 'next/link';
import { ReactElement, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

type ButtonProps = {
  Icon: ReactElement;
  name: string;
  onClick: () => void;
  x?: number;
  direction?: 'x' | 'y';
  isActive?: boolean;
};

type LinkProps = {
  Icon: ReactElement;
  name: string;
  href: string;
  x?: number;
  direction?: 'x' | 'y';
  isActive?: boolean;
};

type Props = ButtonProps | LinkProps;

const AnimatedIconCTA = (props: Props) => {
  const { Icon, name, x = 100, direction = 'x', isActive = false } = props;
  const controls = useAnimation();
  const tooltipVariants = {
    hover: { opacity: 1, [direction]: direction === 'y' ? -x : x },
    initial: { opacity: 0, [direction]: 0 },
  };

  useEffect(() => {
    controls.start('initial');
  }, [controls]);

  const content = (
    <motion.div
      className={`p-4 rounded-xl text-2xl transition-colors opacity-70 hover:opacity-100 hover:bg-foreground cursor-pointer relative group ${
        isActive ? 'bg-foreground' : ''
      }`}
      onHoverStart={() => controls.start('hover')}
      onHoverEnd={() => controls.start('initial')}
    >
      {Icon}
      <div
        className={`hidden group-hover:block absolute ${
          direction === 'y'
            ? 'left-1/2 -translate-x-1/2'
            : 'top-1/2 -right-0 -translate-y-1/2'
        } `}
      >
        <motion.div
          className='w-max h-full bg-foreground px-4 py-2 rounded-lg uppercase text-base text-primary'
          variants={tooltipVariants}
          animate={controls}
          transition={{ delay: 0.2 }}
        >
          {name}
        </motion.div>
      </div>
    </motion.div>
  );

  if ('onClick' in props) {
    return <button onClick={props.onClick}>{content}</button>;
  }

  return <Link href={props.href}>{content}</Link>;
};

export default AnimatedIconCTA;

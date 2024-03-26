'use client';
import { motion } from 'framer-motion';

const LOOP_DURATION = 2;

const PingIcon = () => {
  return (
    <div className='relative rounded-full aspect-square size-2'>
      <div className='size-2 rounded-full bg-green-600'></div>
      <Band delay={0} />
      <Band delay={LOOP_DURATION * 0.25} />
    </div>
  );
};

const Band = ({ delay }: { delay: number }) => {
  return (
    <motion.span
      style={{
        translateX: '-50%',
        translateY: '-50%',
      }}
      initial={{
        opacity: 0,
        scale: 0.25,
      }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: 1,
      }}
      transition={{
        repeat: Infinity,
        repeatType: 'loop',
        times: [0, 0.5, 0.75, 1],
        duration: LOOP_DURATION,
        ease: 'linear',
        delay,
      }}
      className='absolute left-[50%] top-[50%] z-0 w-[250%] h-[250%] rounded-full border-[1px] border-border bg-gradient-to-br from-green-500/50 to-green-800/20 '
    />
  );
};

export default PingIcon;

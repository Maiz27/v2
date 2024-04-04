'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMiniPlus } from 'react-icons/hi2';
import HoverStrips from '../hoverStrips/HoverStrips';

type Props = {
  question: string;
  answer: string;
  // isOpen: boolean,
  // onToggle: () => void
};

const FaqCard = ({
  question,
  answer,
}: // isOpen,
// onToggle,
Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      animate={isOpen ? 'open' : 'closed'}
      className='w-full h-min bg-foreground/70 border border-copy/5 rounded-lg p-6 overflow-hidden relative group'
    >
      <HoverStrips bottom='-bottom-40' />
      <button
        onClick={handleToggle}
        className='flex flex-row-reverse w-full items-center justify-between gap-4 group z-10 relative'
      >
        <span className='text-sm lg:text-base text-left'>{question}</span>

        <motion.span
          variants={{
            open: {
              rotate: '45deg',
            },
            closed: {
              rotate: '0deg',
            },
          }}
          style={{
            border: isOpen ? 'none' : '1px solid',
          }}
          className='p-2 border border-copy/10 rounded-lg text-2xl opacity-100 group-hover:text-primary group-hover:border-primary transition-colors'
        >
          <HiMiniPlus />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'fit-content' : '0px',
          marginBottom: isOpen ? '24px' : '0px',
          marginTop: isOpen ? '16px' : '0px',
          paddingTop: isOpen ? '16px' : '0px',
        }}
        style={{
          borderTop: isOpen ? '1px solid rgb(250 251 252 / 0.1)' : 'none',
        }}
        className='overflow-hidden z-10 relative'
      >
        <p className='text-sm xl:text-base'>{answer}</p>
      </motion.div>
    </motion.div>
  );
};

export default FaqCard;

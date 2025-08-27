'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import BaseCard from '@/components/ui/BaseCard';
import { HiMiniPlus } from 'react-icons/hi2';

type Props = {
  question: string;
  answer: string;
};

const FaqCard = ({ question, answer }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div animate={isOpen ? 'open' : 'closed'} className=''>
      <BaseCard hoverStripsBottom='-bottom-48 md:-bottom-40'>
        <button
          onClick={handleToggle}
          className='flex flex-row-reverse w-full items-center justify-between gap-4 group'
        >
          <span className='w-full text-left text-base'>{question}</span>

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
            className='p-2 border border-border rounded-lg text-2xl opacity-100 group-hover:text-primary group-hover:border-primary transition-colors'
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
          className='overflow-hidden'
        >
          <p className='text-base'>{answer}</p>
        </motion.div>
      </BaseCard>
    </motion.div>
  );
};

export default FaqCard;

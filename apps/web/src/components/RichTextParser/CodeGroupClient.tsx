'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CodeGroupClient = ({
  id,
  snippets,
  children,
}: {
  id: string;
  snippets: any[];
  children: React.ReactNode[];
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const prevTabRef = useRef(activeTab);

  const direction = activeTab > prevTabRef.current ? 1 : -1;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const handleTabChange = (index: number) => {
    prevTabRef.current = activeTab;
    setActiveTab(index);
  };

  return (
    <div>
      <div className='space-x-2 pt-2'>
        <div className='flex space-x-2 mt-2'>
          {snippets.map((snippet, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(index)}
              className={`hover:cursor-pointer p-2 rounded-t-lg border-copy border-t border-x transition-colors ${activeTab === index ? 'bg-primary text-background font-medium' : 'opacity-70'}`}
            >
              {snippet.filename}
            </button>
          ))}
        </div>
      </div>
      <div id={id} className='bg-primary overflow-hidden scroll-m-16'>
        <AnimatePresence initial={false} custom={direction} mode='wait'>
          {children.map(
            (child, index) =>
              activeTab === index && (
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial='enter'
                  animate='center'
                  exit='exit'
                  transition={{ type: 'tween', duration: 0.2 }}
                >
                  {child}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CodeGroupClient;

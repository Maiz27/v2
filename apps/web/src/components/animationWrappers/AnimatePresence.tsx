'use client';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

type Props = {
  mode?: 'popLayout' | 'sync' | 'wait' | undefined;
  children: React.ReactNode;
};

const AnimatePresenceWrapper = ({ mode, children }: Props) => {
  return (
    <AnimatePresence mode={mode}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.key) {
          return (
            <motion.div
              key={child.key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {child}
            </motion.div>
          );
        }
        return child;
      })}
    </AnimatePresence>
  );
};

export default AnimatePresenceWrapper;

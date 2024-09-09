'use client';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PropsWithChildren, useContext, useRef } from 'react';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useIsClient } from '@/lib/context/IsClientContext';

// This component "freezes" the router context to prevent unwanted re-renders
// during page transitions. It's necessary because Framer Motion's AnimatePresence
// can cause multiple re-renders, which can lead to routing issues in Next.js 13+ App Router.
const FrozenRouter = (props: PropsWithChildren<{}>) => {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
};

const PageTransition = ({ children }: PropsWithChildren<{}>) => {
  const pathname = usePathname();
  const isClient = useIsClient();

  // Render without animation on the server to avoid the "Detected multiple renderers
  // concurrently rendering the same context provider" error caused by FrozenRouter
  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;

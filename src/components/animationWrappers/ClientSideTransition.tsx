'use client';
import React, { PropsWithChildren, useContext, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useSearchParams } from 'next/navigation';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useIsClient } from '@/lib/context/IsClientContext';

// Client-side component to use useSearchParams() for optimal AnimatePresence keying
// Ensures transitions occur on both pathname and search param changes but requires
// to be wrapped in a Suspense component to prevent build errors
const ClientSideTransition = ({ children }: PropsWithChildren<{}>) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isClient = useIsClient();

  // Create a key that includes both pathname and search params
  const pageKey = `${pathname}?${searchParams.toString()}`;

  // Avoid "Detected multiple renderers concurrently rendering the same context provider" error
  // by only rendering the animation wrapper on the client side
  if (!isClient) return <>{children}</>;

  return (
    <AnimatePresence mode='wait'>
      <motion.main
        key={pageKey}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.main>
    </AnimatePresence>
  );
};

export default ClientSideTransition;

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

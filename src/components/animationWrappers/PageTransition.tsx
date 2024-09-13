import { PropsWithChildren, Suspense } from 'react';
import ClientSideTransition from './ClientSideTransition';

const PageTransition = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Suspense fallback={<>{children}</>}>
      <ClientSideTransition>{children}</ClientSideTransition>
    </Suspense>
  );
};

export default PageTransition;

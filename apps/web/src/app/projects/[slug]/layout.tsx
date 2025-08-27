import { ReactNode, Suspense } from 'react';
import { ProjectHeaderSkeleton } from '@/components/projects/ProjectHeader';

const layout = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<ProjectHeaderSkeleton />}>{children}</Suspense>;
};

export default layout;

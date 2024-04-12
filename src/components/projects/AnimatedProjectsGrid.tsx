'use client';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { Project } from '@/lib/types';
import AnimateInView from '../animationWrappers/AnimateInView';

type Props = {
  projects: Project[];
};

const AnimatedProjectsGrid = ({ projects }: Props) => {
  return (
    <AnimateInView
      tag='section'
      className='mb-10 mt-10 grid place-items-center grid-cols-1 lg:grid-cols-2 gap-4'
    >
      <AnimatePresence mode='popLayout'>
        {projects.map((project, idx) => (
          <motion.div
            key={project.href}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ delay: idx * 0.6, duration: 0.5 }}
            className='h-full w-full'
          >
            <ProjectCard
              key={project.href}
              project={project}
              hasImage={false}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </AnimateInView>
  );
};

export default AnimatedProjectsGrid;

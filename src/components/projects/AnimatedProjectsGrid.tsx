'use client';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { Project } from '@/lib/types';

type Props = {
  projects: Project[];
};

const AnimatedProjectsGrid = ({ projects }: Props) => {
  return (
    <section className='mb-10'>
      <div className='mt-10 grid place-items-center grid-cols-1 lg:grid-cols-2 gap-4'>
        <AnimatePresence mode='wait'>
          {projects.map((project, idx) => (
            <motion.div
              key={project.href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: idx * 0.1 }}
              className='h-min w-full'
            >
              <ProjectCard
                key={project.href}
                project={project}
                hasImage={false}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AnimatedProjectsGrid;

'use client';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { Project } from '@/lib/types';
import AnimateInView from '../animationWrappers/AnimateInView';
import { ItemList } from 'schema-dts';
import JsonLd from '../jsonLd/JsonLd';
import { BASEURL } from '@/lib/Constants';

type Props = {
  projects: Project[];
};

const AnimatedProjectsGrid = ({ projects }: Props) => {
  const projectsJsonLd: ItemList = {
    '@type': 'ItemList',
    itemListElement: projects.map(
      ({ title, href, source, description, date, slug }, idx) => ({
        '@type': 'ListItem',
        name: title,
        description: description,
        position: idx + 1,
        url: href || source || `${BASEURL}/projects/${slug.current}`,
        subjectOf: {
          '@type': 'CreativeWork',
          name: title,
          description: description,
          datePublished: date,
          url: href || source || `${BASEURL}/projects/${slug.current}`,
        },
      })
    ),
  };

  return (
    <AnimateInView
      tag='section'
      className='mb-10 mt-10 grid place-items-center grid-cols-1 lg:grid-cols-2 gap-4'
    >
      <JsonLd schema={projectsJsonLd} />

      <AnimatePresence mode='popLayout'>
        {projects.map((project, idx) => (
          <motion.div
            key={project.href}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0, transition: { delay: idx * 0.6 } }}
            exit={{ opacity: 0, y: 15, transition: { delay: idx * 0.1 } }}
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

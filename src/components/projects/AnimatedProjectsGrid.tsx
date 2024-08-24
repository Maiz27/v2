import JsonLd from '../jsonLd/JsonLd';
import ProjectCard from './ProjectCard';
import AnimateInView from '../animationWrappers/AnimateInView';
import AnimatePresenceWrapper from '../animationWrappers/AnimatePresence';
import { ItemList } from 'schema-dts';
import { BASEURL } from '@/lib/Constants';
import { Project } from '@/lib/types';

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
      className='mt-10 grid place-items-center grid-cols-1 lg:grid-cols-2 gap-4'
    >
      <JsonLd schema={projectsJsonLd} />

      {/* 
        The key prop on AnimatePresenceWrapper forces a complete re-render when the project list changes.
        This ensures proper animation for all state changes, including when projects are filtered or reordered.
        Without this, updates to projects with the same slugs (e.g., changing from all projects to only TypeScript projects) might not trigger animations.
      */}
      <AnimatePresenceWrapper
        key={projects.map((p) => p.slug.current).join(',')}
        mode='popLayout'
      >
        {projects.map((project, idx) => (
          <ProjectCard
            key={`${idx}-${project.slug.current}`}
            project={project}
            index={idx}
          />
        ))}
      </AnimatePresenceWrapper>
    </AnimateInView>
  );
};

export default AnimatedProjectsGrid;

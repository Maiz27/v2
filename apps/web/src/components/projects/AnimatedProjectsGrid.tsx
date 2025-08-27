import JsonLd from '../jsonLd/JsonLd';
import ProjectCard from './ProjectCard';
import AnimateInView from '../animationWrappers/AnimateInView';
import { ItemList } from 'schema-dts';
import { BASEURL } from '@/lib/Constants';
import { GetProjectsResult } from '@/lib/sanity/types';

type Props = {
  projects: GetProjectsResult;
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
        url: href || source || `${BASEURL}/projects/${slug?.current}`,
        subjectOf: {
          '@type': 'CreativeWork',
          name: title,
          description: description,
          datePublished: date,
          url: href || source || `${BASEURL}/projects/${slug?.current}`,
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

      {projects.map((project, idx) => (
        <ProjectCard
          key={`${idx}-${project.slug?.current}`}
          project={project}
          index={idx}
        />
      ))}
    </AnimateInView>
  );
};

export default AnimatedProjectsGrid;

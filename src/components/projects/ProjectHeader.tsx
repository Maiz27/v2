import Heading from '../heading/Heading';
import ImageCarousel from './ImageCarousel';
import { StatusIcon, CardLink } from './ProjectCard';
import { getToolDetails, getDomain } from '@/lib/utilities';
import { Project } from '@/lib/types';
import { SiGithub } from 'react-icons/si';
import {
  HiOutlineLightBulb,
  HiOutlineQuestionMarkCircle,
  HiLink,
} from 'react-icons/hi2';
import AnimateInView from '../animationWrappers/AnimateInView';

type Props = {
  project: Project;
};

const ProjectHeader = ({ project }: Props) => {
  const { contentTitle, description, tech, source, href, status } = project;
  return (
    <>
      <Heading
        Tag='h1'
        icon={<HiOutlineLightBulb />}
        heading={contentTitle}
        paragraph={description}
      >
        <div className='flex flex-col lg:flex-row-reverse lg:justify-between pt-6 gap-4'>
          <div className='w-full lg:w-fit flex justify-center items-center gap-4'>
            {tech.map(({ name }) => {
              const { icon, href } = getToolDetails(name) ?? {
                icon: <HiOutlineQuestionMarkCircle />,
                href: null,
              };
              return (
                <a
                  key={name}
                  href={href!}
                  data-tip={name}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-xl opacity-70 hover:opacity-100 hover:text-primary transition-all'
                >
                  {icon}
                </a>
              );
            })}
          </div>
          <div className='w-full lg:w-fit flex justify-center items-center gap-4 lg:gap-4'>
            <StatusIcon status={status} />

            {href && (
              <CardLink href={href}>
                <HiLink />
                <span>{getDomain(href)}</span>
              </CardLink>
            )}
            {source && (
              <CardLink href={source}>
                <SiGithub />
                <span>Source</span>
              </CardLink>
            )}
          </div>
        </div>
      </Heading>

      <AnimateInView
        delay={1.4}
        className='flex w-full h-[30rem] overflow-hidden max-w-full border-b border-border py-4'
        style={{
          maskImage:
            'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)',
        }}
      >
        <ImageCarousel imgs={project.images} />
      </AnimateInView>
    </>
  );
};

export default ProjectHeader;

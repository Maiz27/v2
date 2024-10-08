import Heading from '../heading/Heading';
import ImageCarousel from './ImageCarousel';
import { StatusIcon, CardLink, TechRow } from './ProjectCard';
import { getDomain, getMonthYear } from '@/lib/utilities';
import { Project } from '@/lib/types';
import { SiGithub } from 'react-icons/si';
import {
  HiOutlineLightBulb,
  HiLink,
  HiOutlineCalendarDays,
} from 'react-icons/hi2';
import AnimateInView from '../animationWrappers/AnimateInView';

type Props = {
  project: Project;
};

const ProjectHeader = ({ project }: Props) => {
  const { contentTitle, description, tech, source, href, status, date } =
    project;
  return (
    <>
      <Heading
        Tag='h1'
        icon={<HiOutlineLightBulb />}
        heading={contentTitle}
        paragraph={description}
      >
        <div className='flex flex-col lg:flex-row lg:justify-between gap-4'>
          <div className='w-full lg:w-fit flex justify-center items-center gap-4 text-sm xl:text-base'>
            <span className='opacity-70 flex items-center space-x-1'>
              <HiOutlineCalendarDays />
              <span>{getMonthYear(date)}</span>
            </span>
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
          <div className='w-full lg:w-fit flex justify-center items-center gap-4'>
            <TechRow tech={tech} />
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

export const ProjectHeaderSkeleton = () => {
  return (
    <>
      <div className='space-y-4 animate-pulse'>
        {/* Title and description */}
        <div className='space-y-2'>
          <div className='h-8 bg-copy/70 rounded w-3/4'></div>
          <div className='h-4 bg-copy/70 rounded w-full'></div>
          <div className='h-4 bg-copy/70 rounded w-5/6'></div>
        </div>

        {/* Meta information */}
        <div className='flex flex-col lg:flex-row lg:justify-between gap-4'>
          <div className='w-full lg:w-fit flex justify-center items-center gap-4'>
            {/* Date, status, links */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className='h-6 bg-copy/70 rounded w-20'></div>
            ))}
          </div>
          <div className='w-full lg:w-fit flex justify-center items-center gap-4'>
            {/* Tech stack */}
            {[1, 2, 3].map((i) => (
              <div key={i} className='h-6 bg-copy/70 rounded w-16'></div>
            ))}
          </div>
        </div>
      </div>

      {/* Image carousel skeleton */}
      <div className='mt-4 w-full h-[30rem] bg-copy/70 rounded animate-pulse'></div>
    </>
  );
};

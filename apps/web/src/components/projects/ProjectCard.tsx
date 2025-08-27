import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import BaseCard from '@/components/ui/BaseCard';
import BoxesReveal from '@/components/animationWrappers/BoxesReveal';
import AnimateInView from '../animationWrappers/AnimateInView';
import ToolsRow from '../tools/ToolsRow';
import { getDomain, getMonthYear } from '@/lib/utilities';
import {
  HiLink,
  HiOutlineCalendarDays,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlinePauseCircle,
} from 'react-icons/hi2';
import { SiGithub } from 'react-icons/si';
import { Project, Tool } from '@/lib/types';

type Props = {
  project: Project;
  featured?: boolean;
  index?: number;
};

const STATUS = {
  completed: {
    icon: <HiOutlineCheckCircle className='text-green-500' />,
    text: 'Completed',
  },
  ongoing: {
    icon: <HiOutlineClock className='text-orange-500' />,
    text: 'Ongoing',
  },
  paused: {
    icon: <HiOutlinePauseCircle className='text-red-500' />,
    text: 'Paused',
  },
};

const ProjectCard = ({ project, featured = false, index = 0 }: Props) => {
  const {
    mainImage,
    title,
    status,
    href,
    source,
    description,
    tools,
    slug,
    date,
  } = project;
  return (
    <BaseCard
      delay={0.3 * index}
      hoverStripsBottom='-bottom-40'
      className='w-full h-full max-w-md'
    >
      <div className='w-full h-full flex flex-col gap-5'>
        {featured && (
          <BoxesReveal className='w-full h-full overflow-hidden rounded-lg border border-border'>
            <Image
              src={mainImage}
              alt={title}
              title={title}
              width={500}
              height={500}
              className='w-full h-full object-cover'
            />
          </BoxesReveal>
        )}
        <div className='min-h-52 grow flex flex-col justify-around '>
          <div className='flex flex-col space-y-2'>
            <div className='flex justify-between items-center'>
              <h3 className='text-2xl font-bold w-fit flex items-center'>
                <Link
                  href={`/projects/${slug.current}`}
                  className='px-2 hover:text-primary transition-colors'
                >
                  {title}
                </Link>
              </h3>
              <span className='opacity-70 flex items-center space-x-1 text-sm'>
                <HiOutlineCalendarDays />
                <span>{getMonthYear(date)}</span>
              </span>
            </div>
            <AnimateInView className='flex items-center flex-w space-x-4 text-sm px-1'>
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
            </AnimateInView>
          </div>

          <div className='grow my-2'>
            <p className='text-sm p-2 text-balance'>{description}</p>
          </div>

          <AnimateInView className='flex items-center gap-4 py-2 px-4 border-y border-border'>
            <ToolsRow tools={tools} />
          </AnimateInView>
        </div>
      </div>
    </BaseCard>
  );
};

export default ProjectCard;

export const StatusIcon = ({ status }: { status: Project['status'] }) => {
  const { icon, text } = STATUS[status];
  return (
    <span className='opacity-70 flex items-center space-x-1'>
      {icon}
      <span>{text}</span>
    </span>
  );
};

export const CardLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <Link
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className='opacity-70 hover:opacity-100 hover:text-primary transition-all flex items-center space-x-1'
  >
    {children}
  </Link>
);

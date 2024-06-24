import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import BaseCard from '@/components/ui/BaseCard';
import BoxesReveal from '@/components/animationWrappers/BoxesReveal';
import SvgTool from '../tools/SvgTool';
import AnimateInView from '../animationWrappers/AnimateInView';
import { getDomain, getMonthYear, getToolDetails } from '@/lib/utilities';
import { Project, ProjectTech } from '@/lib/types';
import {
  HiLink,
  HiOutlineCalendarDays,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlinePauseCircle,
  HiOutlineQuestionMarkCircle,
} from 'react-icons/hi2';
import { SiGithub } from 'react-icons/si';

type Props = {
  project: Project;
  hasImage?: boolean;
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

const ProjectCard = ({ project, hasImage = true, index = 0 }: Props) => {
  const {
    mainImage,
    title,
    status,
    href,
    source,
    description,
    tech,
    slug,
    date,
  } = project;
  return (
    <BaseCard
      delay={0.6 * index}
      hoverStripsBottom='-bottom-40'
      className='w-full h-full'
    >
      <div className='w-full h-full flex flex-col gap-5'>
        {hasImage && (
          <BoxesReveal className='w-full h-full overflow-hidden rounded-lg border border-border'>
            <Image
              src={mainImage}
              alt={title}
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
            <TechRow tech={tech} />
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
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className='opacity-70 hover:opacity-100 hover:text-primary transition-all flex items-center space-x-1'
  >
    {children}
  </a>
);

export const TechRow = ({ tech }: { tech: ProjectTech[] }) => {
  return tech.map(({ name }) => {
    const { icon, href } = getToolDetails(name) ?? {
      icon: <HiOutlineQuestionMarkCircle />,
      href: null,
    };
    const isImage = typeof icon === 'string';

    return (
      <a
        key={name}
        href={href!}
        data-tip={name}
        title={name}
        target='_blank'
        rel='noopener noreferrer'
        className='text-xl opacity-70 hover:opacity-100 hover:text-primary transition-all'
      >
        {isImage ? (
          <SvgTool name={name} className='w-5 h-5' fill='currentColor' />
        ) : (
          <>{icon}</>
        )}
      </a>
    );
  });
};

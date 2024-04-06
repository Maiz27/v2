import { ReactNode } from 'react';
import BaseCard from '@/components/ui/BaseCard';
import ImageCard from '@/components/imageCard/ImageCard';
import { Project } from '@/lib/types';
import { getDomain, getToolIcon } from '@/lib/utilities';
import {
  HiLink,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlinePauseCircle,
} from 'react-icons/hi2';
import { SiGithub } from 'react-icons/si';

type Props = {
  project: Project;
  hasImage?: boolean;
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

const ProjectCard = ({ project, hasImage = true }: Props) => {
  const { image, title, status, href, source, description, tech } = project;
  return (
    <BaseCard hoverStripsBottom='-bottom-40' className='w-full h-full'>
      <div className='w-full h-full flex flex-col gap-5'>
        {hasImage && (
          <div className='w-full h-64 overflow-hidden rounded-lg'>
            <ImageCard src={image} />
          </div>
        )}
        <div className='min-h-52 grow flex flex-col justify-around '>
          <div className='flex flex-col space-y-1'>
            <h3 className='text-2xl font-bold w-fit'>{title}</h3>
            <div className='flex items-center space-x-4 text-sm'>
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

          <div className='grow my-2'>
            <p className='text-sm p-2 text-balance'>{description}</p>
          </div>

          <div className='flex items-center gap-4 py-2 px-4 border-y border-copy/10'>
            {tech.map((name) => {
              return (
                <span key={name} className='text-xl' title={name}>
                  {getToolIcon(name)}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </BaseCard>
  );
};

export default ProjectCard;

const StatusIcon = ({ status }: { status: Project['status'] }) => {
  const { icon, text } = STATUS[status];
  return (
    <span className='opacity-70 flex items-center space-x-1'>
      {icon}
      <span>{text}</span>
    </span>
  );
};

const CardLink = ({
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

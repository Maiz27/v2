import Image from 'next/image';
import BaseCard from '@/components/ui/BaseCard';
import RichTextParser from '@/components/RichTextParser/RichTextParser';
import AnimateInView from '@/components/animationWrappers/AnimateInView';
import ToolsRow from '../tools/ToolsRow';
import { urlFor } from '@/lib/sanity/client';
import { getDomain, roundYear } from '@/lib/utilities';
import { HiLink, HiOutlineMapPin } from 'react-icons/hi2';
import { GetExperiencesResult } from '@/lib/sanity/types';

type Props = {
  experience: GetExperiencesResult[0];
  index?: number;
};

const ExperienceCard = ({ experience: item, index = 0 }: Props) => {
  const { title, company, location, duration, description, partTime, tools } =
    item;
  const logo = urlFor(company.logo).url();

  return (
    <BaseCard
      threshold={0.2}
      delay={0.4 * index}
      hoverStripsBottom='-bottom-28 lg:-bottom-40'
    >
      <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-8 lg:gap-0'>
        <div className='flex items-center gap-2'>
          <div className='bg-copy/90 rounded-lg size-14 xl:size-16 grid place-items-center'>
            <Image
              width={50}
              height={50}
              src={logo}
              alt={company.name}
              title={company.name}
              className='w-2/3 object-contain'
            />
          </div>
          <div className='flex flex-col space-y-1 grow'>
            <h3 className='text-lg xl:text-2xl w-full lg:w-fit flex justify-between items-center space-x-2'>
              <span className='opacity-100'>{company.name}</span>
              <AnimateInView
                delay={1}
                tag='span'
                className='px-4 py-1 rounded-xl bg-foreground text-sm xl:text-lg font-normal opacity-100 group-hover:text-primary transition-colors'
              >
                &nbsp;{company.label}
              </AnimateInView>
            </h3>
            <AnimateInView
              delay={1}
              className='flex items-center space-x-4 text-sm'
            >
              <a
                href={company.href}
                target='_blank'
                rel='noopener noreferrer'
                className='opacity-70 hover:opacity-100 hover:text-primary transition-all flex items-center space-x-1'
              >
                <HiLink />
                <span>{getDomain(company.href)}</span>
              </a>
              <span className='flex items-center space-x-1'>
                <HiOutlineMapPin />
                <p>{location}</p>
              </span>
            </AnimateInView>
          </div>
        </div>
        <div className='font-bold text-xl py-2 border-y border-border lg:border-0 group-hover:text-primary transition-colors'>
          {roundYear(duration.from)} -{' '}
          {duration.to ? roundYear(duration.to) : 'Present'}
        </div>
      </div>

      <div className='border border-border rounded-lg p-6 space-y-2 z-10 relative mt-6 flex flex-col gap-2'>
        <h4 className='text-lg xl:text-xl w-full flex items-center space-x-2'>
          <span className='opacity-100'>{title}</span>
          {partTime && (
            <AnimateInView
              delay={1}
              className='px-4 py-1 rounded-xl bg-foreground text-sm xl:text-base font-normal group-hover:text-primary transition-colors'
            >
              &nbsp;Part Time
            </AnimateInView>
          )}
        </h4>

        <div className='text-sm'>
          <RichTextParser content={description} />
        </div>

        {tools && tools.length > 0 && (
          <AnimateInView className='flex items-center gap-4 pl-6'>
            <ToolsRow tools={tools} />
          </AnimateInView>
        )}
      </div>
    </BaseCard>
  );
};

export default ExperienceCard;

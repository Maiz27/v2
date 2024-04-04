import Image from 'next/image';
import { getDomain } from '@/lib/utilities';
import { FaLink, FaMapPin } from 'react-icons/fa6';
import HoverStrips from '../hoverStrips/HoverStrips';

type Company = {
  name: string;
  href: string;
  label: string;
  logo: string;
};

type Props = {
  item: {
    title: string;
    company: Company;
    location: string;
    duration: {
      from: string;
      to?: string;
    };
    description: string[];
    isPartTime?: boolean;
  };
};

const ExperienceCard = ({ item }: Props) => {
  const {
    title,
    company,
    location,
    duration,
    description,
    isPartTime = false,
  } = item;
  return (
    <div className='w-full bg-foreground/50 rounded-lg p-6 border border-copy/10 relative group overflow-hidden'>
      <HoverStrips bottom='-bottom-28 lg:-bottom-40' />

      <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-8 lg:gap-0 z-10 relative'>
        <div className='flex items-center gap-2'>
          <div className='bg-copy/90 rounded-lg size-12 xl:size-16 grid place-items-center'>
            <Image
              width={50}
              height={50}
              src={company.logo}
              alt={company.name}
              className='w-2/3 object-contain'
            />
          </div>
          <div className='flex flex-col space-y-2 flex-grow'>
            <h3 className='text-lg xl:text-2xl w-full lg:w-fit flex justify-between items-center space-x-2'>
              <span className='opacity-100'>{company.name}</span>
              <span className='px-4 py-1 rounded-xl bg-foreground text-sm xl:text-lg font-normal opacity-100 group-hover:text-primary transition-colors'>
                {company.label}
              </span>
            </h3>
            <div className='flex items-center space-x-4'>
              <a
                href={company.href}
                target='_blank'
                rel='noopener noreferrer'
                className='text-sm opacity-70 hover:opacity-100 transition-opacity flex items-center space-x-1'
              >
                <FaLink />
                <span>{getDomain(company.href)}</span>
              </a>
              <span className='text-sm flex items-center space-x-1'>
                <FaMapPin />
                <p>{location}</p>
              </span>
            </div>
          </div>
        </div>
        <div className='font-bold text-xl py-2 border-y border-copy/10 lg:border-0 group-hover:text-primary transition-colors'>
          {duration.from} - {duration.to ?? 'Present'}
        </div>
      </div>

      <div className='border border-copy/10 rounded-lg p-6 space-y-2 z-10 relative mt-6'>
        <h4 className='text-lg xl:text-xl w-full flex items-center space-x-2'>
          <span className='opacity-100'>{title}</span>
          {isPartTime && (
            <span className='px-4 py-1 rounded-xl bg-foreground text-sm xl:text-base font-normal group-hover:text-primary transition-colors'>
              Part Time
            </span>
          )}
        </h4>
        <ul className='list-disc px-4 space-y-1'>
          {description.map((desc, index) => (
            <li key={index} className='text-sm'>
              <p>{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceCard;

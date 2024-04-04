import Link from 'next/link';
import IconCTA from '../CTA/IconCTA';
import TimeZone from '../header/TimeZone';
import { ROUTES, SOCIALS } from '@/lib/Constants';

const Footer = () => {
  return (
    <footer className='min-h-20 xl:border-t border-copy/10'>
      <div className='flex flex-col lg:flex-row lg:justify-between xl:hidden justify-center items-center border-y border-copy/10 gap-6 py-4 px-4 xl:px-8'>
        <div className='flex flex-col lg:flex-row justify-center items-center gap-2'>
          <TimeZone timeZone='Africa/Juba' />
        </div>

        <div className='flex justify-center items-center gap-2'>
          {SOCIALS.map(({ icon, name, href }) => (
            <IconCTA key={href} Icon={icon} name={name} href={href} />
          ))}
        </div>
      </div>

      <div className='flex flex-col lg:flex-row lg:justify-between justify-center items-center py-4 gap-4 px-4'>
        <nav className='xl:hidden flex justify-center items-center gap-4'>
          {ROUTES.map(({ name, href }) => (
            <Link
              key={href}
              href={href}
              className='opacity-70 hover:opacity-100 transition-opacity'
            >
              {name}
            </Link>
          ))}
        </nav>
        <div className='hidden xl:block'>
          &copy;
          {new Date().getFullYear().toString()}, All Rights Reserved
        </div>
        <span>
          {`Built with `}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='inline-block h-5 w-5 text-primary'
          >
            <rect x='14' y='14' width='4' height='6' rx='2'></rect>
            <rect x='6' y='4' width='4' height='6' rx='2'></rect>
            <path d='M6 20h4'></path>
            <path d='M14 10h4'></path>
            <path d='M6 14h2v6'></path>
            <path d='M14 4h2v6'></path>
          </svg>
          {` by Maged`}
        </span>
      </div>
    </footer>
  );
};

export default Footer;

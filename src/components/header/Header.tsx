import Link from 'next/link';
import { ReactElement } from 'react';
import PingIcon from './PingIcon';
import TimeZone from './TimeZone';
import { routes } from '@/lib/Constants';

const Header = () => {
  return (
    <header className='h-28 lg:border-b lg:border-copy/10 flex lg:justify-between items-center pt-6 pb-4 lg:px-4 xl:px-8'>
      <div className='hidden lg:flex justify-center items-center gap-2 rounded-2xl bg-foreground px-4 py-2'>
        <PingIcon />
        <span>Available For Work</span>
      </div>
      <nav className='flex-grow lg:flex-grow-0 xl:hidden flex justify-center items-center gap-2 px-4'>
        {routes.map(({ icon, name, href }) => (
          <NavLink key={href} Icon={icon} href={href} name={name} />
        ))}
      </nav>
      <div className='hidden xl:flex justify-center items-center gap-2'>
        <TimeZone timeZone='Africa/Juba' />
      </div>
    </header>
  );
};

export default Header;

type NavLinkProps = {
  href: string;
  name: string;
  Icon: ReactElement;
};

const NavLink = ({ href, name, Icon }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className='w-full flex justify-center items-center gap-2 px-4 py-3 rounded-lg text-lg transition-colors opacity-70 hover:opacity-100 bg-foreground border border-copy/5'
    >
      {Icon}
      <span className='text-base uppercase'>{name}</span>
    </Link>
  );
};

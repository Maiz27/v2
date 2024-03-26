import Link from 'next/link';
import Image from 'next/image';
import ScrollToTop from './ScrollToTop';
import AnimatedIconCTA from '../CTA/AnimatedIconCTA';
import { routes } from '@/lib/Constants';

const Left = () => {
  return (
    <aside className='hidden xl:flex xl:flex-col justify-between items-center py-10 sticky top-0 h-screen w-1/6'>
      <Link
        href='/'
        className='rounded-full aspect-square w-20 overflow-hidden border-foreground border-4'
      >
        <Image src='/imgs/avatar.webp' alt='Avatar' width={100} height={50} />
      </Link>
      <div className='flex flex-col justify-center gap-4'>
        {routes.map(({ icon, name, href, x }) => (
          <AnimatedIconCTA
            key={href}
            Icon={icon}
            name={name}
            href={href}
            x={x!}
          />
        ))}
      </div>
      <ScrollToTop />
    </aside>
  );
};

export default Left;

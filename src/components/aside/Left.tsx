import Link from 'next/link';
import Image from 'next/image';
import LeftLinks from './LeftLinks';
import ScrollToTop from './ScrollToTop';

const Left = () => {
  return (
    <aside className='hidden xl:flex xl:flex-col justify-between items-end pr-8 py-10 sticky top-0 h-screen w-1/6 2xl:w-1/5'>
      <Link
        href='/'
        className='rounded-full aspect-square w-16 overflow-hidden border-foreground border-4 box-border'
      >
        <Image src='/imgs/avatar.webp' alt='Avatar' width={100} height={50} />
      </Link>
      <LeftLinks />
      <ScrollToTop />
    </aside>
  );
};

export default Left;

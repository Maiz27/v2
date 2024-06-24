import Link from 'next/link';
import Image from 'next/image';
import LeftLinks from './LeftLinks';
import ScrollToTop from './ScrollToTop';
import { getMainImage } from '@/lib/sanity/queries';
import { fetchSanityData } from '@/lib/sanity/client';
import { AboutMe } from '@/lib/types';

export const revalidate = 60;

const Left = async () => {
  const { imageUrl }: AboutMe = await fetchSanityData(getMainImage);

  return (
    <aside className='hidden xl:flex xl:flex-col justify-between items-end pr-8 py-10 sticky top-0 h-screen w-1/6 2xl:w-1/5'>
      <Link
        href='/'
        className='rounded-full aspect-square w-16 overflow-hidden border-primary border-2 box-border'
      >
        <Image src={imageUrl} alt='Avatar' width={100} height={50} />
      </Link>
      <LeftLinks />
      <ScrollToTop />
    </aside>
  );
};

export default Left;

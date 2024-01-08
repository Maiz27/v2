import Image from 'next/image';
import logo from '/public/imgs/logo/logo.png';

const Navbar = () => {
  return (
    <header>
      <nav className='h-16 absolute left-0 right-0 top-0 z-[99999999]'>
        <div className='h-full mx-auto flex max-w-7xl items-center justify-between p-2 md:px-4'>
          <div className='h-full w-fit'>
            <Image
              src={logo}
              alt='Maged Faiz'
              className='h-full w-fit object-scale-down'
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

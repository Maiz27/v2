'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useNavbar from '@/hooks/useNavbar';
import { ToggleTheme } from '../darkThemeProvider/DarkThemeProvider';
import { BiX, BiMenu } from 'react-icons/bi';
import {
  LOGO,
  linkWrapperVariants,
  navLinkVariants,
  navVariants,
  routes,
} from '@/Constants';

const Navbar = () => {
  const { isOpen, toggleMenu } = useNavbar();

  return (
    <header>
      <nav className='h-20 absolute left-0 right-0 top-0 z-[99999999]'>
        <div className='h-full mx-auto flex max-w-7xl items-center justify-between p-4 md:px-4'>
          <Link href='/' className='h-full w-fit'>
            <Image
              src={LOGO}
              alt='Maged Faiz'
              className='h-full w-fit object-scale-down'
            />
          </Link>
          <div>
            <NavRight />
            <MenuIconButton toggleMenu={toggleMenu} isOpen={isOpen} />
            <NavMenu isOpen={isOpen} />
          </div>
        </div>
      </nav>
    </header>
  );
};

const NavRight = () => {
  return (
    <ul className='hidden lg:flex items-center gap-6'>
      {routes.map(({ name, href }) => {
        if (href !== '/')
          return (
            <Link
              href={href}
              key={href}
              className='text-lg xl:text-xl font-black hover:text-primary transition-colors'
            >
              {name}
            </Link>
          );
      })}
      <button className='text-lg xl:text-xl font-black hover:text-primary transition-colors underline text-primary'>
        Contact
      </button>

      <ToggleTheme />
    </ul>
  );
};

const NavMenu = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <motion.aside
      className='fixed inset-0 -z-10 w-full bg-foreground dark:bg-copy'
      animate={isOpen ? 'open' : 'closed'}
      variants={navVariants}
      initial='closed'
    >
      <motion.ul
        variants={linkWrapperVariants}
        className='flex flex-col gap-4 absolute bottom-20 left-8'
      >
        {routes.map(({ name, href }) => (
          <motion.div
            key={href}
            className='inline-block z-10 w-fit font-black text-7xl hover:text-primary transition-colors'
            variants={navLinkVariants}
            transition={{
              type: 'spring',
              damping: 3,
            }}
            whileHover={{
              y: -15,
              rotate: '-7.5deg',
            }}
            rel='nofollow'
          >
            <Link href={href}>{name}</Link>
          </motion.div>
        ))}
        <motion.button
          className='inline-block z-10 w-fit font-black text-7xl hover:text-primary transition-colors underline text-primary'
          variants={navLinkVariants}
          transition={{
            type: 'spring',
            damping: 3,
          }}
          whileHover={{
            y: -15,
            rotate: '-7.5deg',
          }}
          rel='nofollow'
        >
          Contact
        </motion.button>
      </motion.ul>
    </motion.aside>
  );
};

const MenuIconButton = ({
  toggleMenu,
  isOpen,
}: {
  toggleMenu: () => void;
  isOpen: boolean;
}) => {
  const Icon = isOpen ? BiX : BiMenu;
  return (
    <div className='flex items-center gap-4 lg:hidden'>
      <ToggleTheme />
      <motion.button
        whileHover={{ rotate: '180deg' }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMenu}
        className='text-4xl hover:text-primary transition-colors z-50 shadow-2xl'
      >
        <Icon />
      </motion.button>
    </div>
  );
};

export default Navbar;

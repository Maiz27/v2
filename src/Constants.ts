import logo from '/public/imgs/logo/logo.png';

export const LOGO = logo;

export const heroBackgroundText = [
  'Craft Elegant Solutions',
  'Pioneer Web Excellence',
  'Design with Purpose',
  'Engineer the Future',
  'Elevate User Experience',
  'Develop Responsively',
  'Optimize for the Web',
  'Innovate in Mobile Tech',
];

export const routes = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Portfolio',
    href: '/portfolio',
  },
];

// Framer Motion Variants

export const navVariants = {
  open: {
    x: '0%',
    borderTopLeftRadius: '0vw',
    borderBottomLeftRadius: '0vw',
    opacity: 1,
  },
  closed: {
    x: '100%',
    borderTopLeftRadius: '50vw',
    borderBottomLeftRadius: '50vw',
    opacity: 0,
  },
};

export const linkWrapperVariants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const navLinkVariants = {
  open: { x: 0 },
  closed: { x: 25 },
};

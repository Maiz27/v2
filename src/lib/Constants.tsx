import logo from '/public/imgs/logo/logo.png';
import {
  FaRegUser,
  FaRegStar,
  FaRegEnvelope,
  FaGithub,
  FaXTwitter,
  FaLinkedinIn,
} from 'react-icons/fa6';

export const LOGO = logo;

export const routes = [
  { icon: <FaRegUser />, name: 'Home', href: '/' },
  { icon: <FaRegStar />, name: 'Services', href: '/services', x: 120 },
  { icon: <FaRegEnvelope />, name: 'Contact', href: '/contact', x: 120 },
];

export const socials = [
  { icon: <FaGithub />, name: 'Github', href: 'https://github.com/Maiz27' },
  {
    icon: <FaXTwitter />,
    name: 'Twitter',
    href: 'https://twitter.com/_Maiz27_',
  },
  {
    icon: <FaLinkedinIn />,
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/maiz27/',
  },
];

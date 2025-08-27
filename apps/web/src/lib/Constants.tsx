import {
  HiOutlineSquare3Stack3D,
  HiOutlineEnvelope,
  HiOutlineGlobeAlt,
  HiOutlineDevicePhoneMobile,
  HiOutlineChartBarSquare,
  HiOutlineCheckCircle,
  HiOutlineInformationCircle,
  HiOutlineXMark,
  HiOutlineExclamationCircle,
  HiEnvelope,
  HiOutlineHome,
} from 'react-icons/hi2';

import {
  SiGithub,
  SiX,
  SiLinkedin,
  SiFacebook,
  SiTelegram,
  SiWhatsapp,
} from 'react-icons/si';

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import { Project } from './sanity/types';

export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

export const BASEURL = `https://www.${DOMAIN}`;

export const EMAIL = process.env.NEXT_PUBLIC_EMAIL;

export const EMAIL_PATTERN = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const ROUTES = [
  {
    icon: (
      <HiOutlineHome className='group-hover:text-primary transition-colors' />
    ),
    name: 'Home',
    href: '/',
  },
  {
    icon: (
      <HiOutlineSquare3Stack3D className='group-hover:text-primary transition-colors' />
    ),
    name: 'Projects',
    href: '/projects',
    x: 130,
  },
  {
    icon: (
      <HiOutlineEnvelope className='group-hover:text-primary transition-colors' />
    ),
    name: 'Contact',
    href: '/contact',
    x: 120,
  },
];

export const SOCIALS = [
  { icon: <SiGithub />, name: 'Github', href: 'https://github.com/Maiz27' },
  {
    icon: <SiX />,
    name: 'Twitter',
    href: 'https://twitter.com/_Maiz27_',
  },
  {
    icon: <SiLinkedin />,
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/maiz27/',
  },
];

export const SERVICES = [
  {
    icon: <HiOutlineGlobeAlt />,
    title: 'Web Development',
    paragraph: 'Bringing ideas to life with robust and scalable web solutions.',
  },
  {
    icon: <HiOutlineDevicePhoneMobile />,
    title: 'Mobile Development',
    paragraph: 'Creating seamless mobile experiences that delight users.',
  },
  {
    icon: <HiOutlineChartBarSquare />,
    title: 'SEO Optimization',
    paragraph: 'Boosting your online presence with effective SEO strategies.',
  },
];

export const BENEFITS = [
  'Speed Delivery',
  'Custom Solutions',
  'Continuous Improvement',
  'Exceptional Quality',
  'Strategic Planning',
  'Security',
  '24/7 Support',
  'Cost-Effective Solutions',
  'Timely Communication',
  'User-Centric Design',
  'Scalability',
  'Flexibility',
  'Innovation',
  'Collaboration',
  'Agile Development',
  'Performance Optimization',
  'Cross-Platform Compatibility',
  'Accessibility',
  'Data Privacy',
  'Technical Expertise',
];

export const PROJECT_STATUS: Project['status'][] = [
  'completed',
  'ongoing',
  'paused',
];

export const TOAST_STATUS = {
  success: <HiOutlineCheckCircle className='text-green-500' />,
  error: <HiOutlineXMark className='text-red-500' />,
  info: <HiOutlineInformationCircle className='text-blue-500' />,
  warning: <HiOutlineExclamationCircle className='text-yellow-500' />,
};

export const SHARE_PLATFORMS = [
  {
    id: 'twitter',
    icon: <SiX className='text-xl xl:text-2xl group-hover:text-primary' />,
    ShareButton: TwitterShareButton,
  },
  {
    id: 'whatsapp',
    icon: (
      <SiWhatsapp className='text-xl xl:text-2xl group-hover:text-primary' />
    ),
    ShareButton: WhatsappShareButton,
  },
  {
    id: 'facebook',
    icon: (
      <SiFacebook className='text-xl xl:text-2xl group-hover:text-primary' />
    ),
    ShareButton: FacebookShareButton,
  },
  {
    id: 'linkedin',
    icon: (
      <SiLinkedin className='text-xl xl:text-2xl group-hover:text-primary' />
    ),
    ShareButton: LinkedinShareButton,
  },
  {
    id: 'telegram',
    icon: (
      <SiTelegram className='text-xl xl:text-2xl group-hover:text-primary' />
    ),
    ShareButton: TelegramShareButton,
  },
  {
    id: 'email',
    icon: (
      <HiEnvelope className='text-xl xl:text-2xl group-hover:text-primary' />
    ),
    ShareButton: EmailShareButton,
  },
];

export const FORMS = {
  contact: {
    fields: { name: '', email: '', message: '' },
    rules: {
      name: (value: string) =>
        value.length > 2 ? '' : 'Name must be longer than 2 characters!',
      email: (value: string) => {
        return value.match(EMAIL_PATTERN)
          ? ''
          : 'Please enter a valid email address';
      },
      message: (value: string) =>
        value.length > 10 ? '' : 'Message must be longer than 10 characters!',
    },
  },
};

// Framer Motion Animation Variants
export const SLIDE_RIGHT = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
};

export const SLIDE_LEFT = {
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
};

export const FADE_IN_UP = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
};

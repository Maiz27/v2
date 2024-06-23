import logo from '/public/imgs/logo/logo.png';

import {
  HiOutlineUser,
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
} from 'react-icons/hi2';

import {
  SiReact,
  SiNextdotjs,
  SiFlutter,
  SiTailwindcss,
  SiFirebase,
  SiTypescript,
  SiDart,
  SiJavascript,
  SiGraphql,
  SiHasura,
  SiPostgresql,
  SiNodedotjs,
  SiSvelte,
  SiRedux,
  SiYarn,
  SiFramer,
  SiSanity,
  SiVisualstudiocode,
  SiVite,
  SiSass,
  SiNetlify,
  SiVercel,
  SiTurborepo,
  SiExpress,
  SiKotlin,
  SiGithub,
  SiX,
  SiLinkedin,
  SiFacebook,
  SiTelegram,
  SiWhatsapp,
  SiPocketbase,
  SiDocker,
  SiSst,
} from 'react-icons/si';

import { ProjectStatus, Tool } from './types';

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

export const LOGO = logo;

export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

export const EMAIL = process.env.NEXT_PUBLIC_EMAIL;

export const EMAIL_PATTERN = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const ROUTES = [
  {
    icon: (
      <HiOutlineUser className='group-hover:text-primary transition-colors' />
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

export const TOOLS: Tool[] = [
  // JavaScript ecosystem
  {
    icon: <SiJavascript />,
    name: 'JavaScript',
    href: 'https://javascript.com',
  },
  {
    icon: <SiTypescript />,
    name: 'TypeScript',
    href: 'https://typescriptlang.org',
  },
  { icon: <SiReact />, name: 'React', href: 'https://react.dev' },
  { icon: <SiNextdotjs />, name: 'Next.js', href: 'https://nextjs.org' },
  { icon: <SiSvelte />, name: 'Svelte', href: 'https://svelte.dev' },
  { icon: <SiRedux />, name: 'Redux', href: 'https://redux.js.org' },
  { icon: <SiNodedotjs />, name: 'Node.js', href: 'https://nodejs.org' },
  { icon: <SiVite />, name: 'Vite', href: 'https://vitejs.dev' },
  { icon: <SiTurborepo />, name: 'Turborepo', href: 'https://turbo.build' },
  { icon: <SiExpress />, name: 'Express.js', href: 'https://expressjs.com' },

  // CSS
  {
    icon: <SiTailwindcss />,
    name: 'Tailwind CSS',
    href: 'https://tailwindcss.com',
  },
  { icon: <SiSass />, name: 'Sass', href: 'https://sass-lang.com' },

  //Deployment
  { icon: <SiNetlify />, name: 'Netlify', href: 'https://netlify.com' },
  { icon: <SiVercel />, name: 'Vercel', href: 'https://vercel.com' },

  // Database
  {
    icon: <SiPostgresql />,
    name: 'PostgreSQL',
    href: 'https://postgresql.org',
  },
  { icon: <SiGraphql />, name: 'GraphQL', href: 'https://graphql.org' },
  { icon: <SiHasura />, name: 'Hasura', href: 'https://hasura.io' },

  // PaaS
  {
    icon: <SiFirebase />,
    name: 'Firebase',
    href: 'https://firebase.google.com',
  },
  {
    icon: <SiPocketbase />,
    name: 'Pocketbase',
    href: 'https://pocketbase.io/',
  },

  // Dart ecosystem
  { icon: <SiDart />, name: 'Dart', href: 'https://dart.dev' },
  { icon: <SiFlutter />, name: 'Flutter', href: 'https://flutter.dev' },

  // Other tools
  { icon: <SiGithub />, name: 'Github', href: 'https://github.com' },
  { icon: <SiDocker />, name: 'Docker', href: 'https://docker.com' },
  { icon: <SiSst />, name: 'SST', href: 'https://sst.dev' },
  {
    icon: <SiFramer />,
    name: 'Framer Motion',
    href: 'https://www.framer.com/motion/',
  },
  {
    icon: '@/assets/tools/gsap.svg',
    name: 'GSAP',
    href: 'https://gsap.com',
  },
  { icon: <SiSanity />, name: 'Sanity', href: 'https://sanity.io' },
  { icon: <SiYarn />, name: 'Yarn', href: 'https://yarnpkg.com' },
  {
    icon: <SiVisualstudiocode />,
    name: 'VS Code',
    href: 'https://code.visualstudio.com',
  },

  //Languages
  { icon: <SiKotlin />, name: 'Kotlin', href: 'https://kotlinlang.org' },
];

export const NON_STACK_TOOLS = [
  'Github',
  'VS Code',
  'Yarn',
  'PostgreSQL',
  'Node.js',
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

export const PROJECT_STATUS: ProjectStatus[] = [
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
    id: 'email',
    icon: (
      <HiEnvelope className='text-xl xl:text-2xl group-hover:text-primary' />
    ),
    ShareButton: EmailShareButton,
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

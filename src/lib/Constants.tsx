import logo from '/public/imgs/logo/logo.png';
import {
  FaRegUser,
  FaRegStar,
  FaRegEnvelope,
  FaGithub,
  FaXTwitter,
  FaLinkedinIn,
} from 'react-icons/fa6';

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
} from 'react-icons/si';

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

export const tools = [
  // JavaScript ecosystem
  { icon: <SiJavascript />, name: 'JavaScript' },
  { icon: <SiTypescript />, name: 'TypeScript' },
  { icon: <SiReact />, name: 'React' },
  { icon: <SiNextdotjs />, name: 'Next.js' },
  { icon: <SiSvelte />, name: 'Svelte' },
  { icon: <SiRedux />, name: 'Redux' },
  { icon: <SiNodedotjs />, name: 'Node.js' },

  // CSS
  { icon: <SiTailwindcss />, name: 'Tailwind CSS' },

  // Database
  { icon: <SiPostgresql />, name: 'PostgreSQL' },
  { icon: <SiGraphql />, name: 'GraphQL' },
  { icon: <SiHasura />, name: 'Hasura' },

  // Firebase
  { icon: <SiFirebase />, name: 'Firebase' },

  // Dart ecosystem
  { icon: <SiDart />, name: 'Dart' },
  { icon: <SiFlutter />, name: 'Flutter' },

  // Other tools
  { icon: <SiYarn />, name: 'Yarn' },
  { icon: <SiFramer />, name: 'Framer' },
  { icon: <SiSanity />, name: 'Sanity' },
];

export const stats = [
  {
    count: 15,
    label: 'Happy Clients',
  },
  {
    count: 3,
    label: 'Years of Experience',
  },
  {
    count: 20,
    label: 'Projects Completed',
  },
  {
    count: '999',
    label: 'Contributions',
  },
];

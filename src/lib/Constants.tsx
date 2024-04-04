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

export const ROUTES = [
  { icon: <FaRegUser />, name: 'Home', href: '/' },
  { icon: <FaRegStar />, name: 'Services', href: '/services', x: 120 },
  { icon: <FaRegEnvelope />, name: 'Contact', href: '/contact', x: 120 },
];

export const SOCIALS = [
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

export const TOOLS = [
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

export const STATS = [
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

export const EXPERIENCE = [
  {
    title: 'Teaching Assistant',
    company: {
      name: 'Future',
      href: 'https://fu.edu.sd/',
      label: 'University',
      logo: '/imgs/companies/future.png',
    },
    location: 'Khartoum, SD',
    duration: {
      from: '2022',
      to: '2023',
    },
    description: [
      'Guided students through the ideation and development of practical projects, culminating in multiple real-world applications.',
      "Enhanced students' understanding of Time Complexity in Algorithms, significantly improving their code analysis skills and efficiency.",
    ],
  },
  {
    title: 'Web Developer',
    company: {
      name: 'Nilotik',
      href: 'https://www.nilotik.tech/',
      label: 'Tech Firm',
      logo: '/imgs/companies/nilotik.png',
    },
    location: 'Juba, SSD',
    duration: {
      from: '2023',
    },
    description: [
      'Led the development of key projects such as Amigos and Black Wings, demonstrating exceptional problem-solving skills and collaborative success.',
      'Mentored interns with a comprehensive web development curriculum, significantly advancing their abilities in coding, debugging, and agile project management.',
      'Collaborated with cross-disciplinary teams to contribute to mobile and web platforms, showcasing versatility and a keen adaptability to emerging tech trends.',
    ],
  },
  {
    title: 'Co-founder',
    isPartTime: true,
    company: {
      name: 'Sahil',
      href: 'https://sahil.app/',
      label: 'Start-up',
      logo: '/imgs/companies/sahil.png',
    },
    location: 'Kigali, RW (Remote)',
    duration: {
      from: '2024',
    },
    description: [
      'Led the development and integration of core app features including authentication, authorization, and Hasura, and crafted a cohesive UI/UX design.',
      'Managed and mentored a team of interns on coding practices, task execution, and project delivery, enhancing team skills and project outcomes.',
      'Contributed to strategic planning, feature research, and implemented a monorepo structure to optimize shared resources and streamline development.',
      "Actively participated in the app's lifecycle from conception to deployment, ensuring scalability and efficiency through effective backend solutions in Express.js.",
    ],
  },
];

import logo from '/public/imgs/logo/logo.png';

import {
  HiOutlineUser,
  HiOutlineSquare3Stack3D,
  HiOutlineEnvelope,
  HiOutlineGlobeAlt,
  HiOutlineDevicePhoneMobile,
  HiOutlineChartBarSquare,
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
  SiTwitter,
  SiLinkedin,
} from 'react-icons/si';
import { Project, ProjectStatus, Tool } from './types';

export const LOGO = logo;

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
    icon: <SiTwitter />,
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

  // Firebase
  {
    icon: <SiFirebase />,
    name: 'Firebase',
    href: 'https://firebase.google.com',
  },

  // Dart ecosystem
  { icon: <SiDart />, name: 'Dart', href: 'https://dart.dev' },
  { icon: <SiFlutter />, name: 'Flutter', href: 'https://flutter.dev' },

  // Other tools
  { icon: <SiGithub />, name: 'Github', href: 'https://github.com' },
  {
    icon: <SiFramer />,
    name: 'Framer Motion',
    href: 'https://www.framer.com/motion/',
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

export const EXPERIENCE = [
  {
    title: 'Teaching Assistant',
    company: {
      name: 'Future',
      href: 'https://fu.edu.sd/',
      label: 'University',
      logo: '/imgs/companies/future.png',
    },
    location: 'Khartoum, Sudan',
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
    location: 'Juba, South Sudan',
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
    location: 'Kigali, Rwanda (Remote)',
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

export const FAQS = [
  {
    question:
      'What can I expect in terms of communication and project updates?',
    answer:
      'You can expect regular updates and open lines of communication. I believe in keeping clients informed and involved throughout the development process.',
  },
  {
    question: 'How do you ensure my website will look good on all devices?',
    answer:
      'I use responsive design practices to make sure your website is compatible and performs well on smartphones, tablets, and desktops.',
  },
  {
    question: 'Can you help my website rank higher on Google?',
    answer:
      'Yes, through SEO optimization techniques, I ensure your content is favored by search engines, improving your visibility online.',
  },
  {
    question: 'How long does it take to build a website or app?',
    answer:
      'The timeline varies based on complexity, but I focus on efficient and agile development to deliver quality products in a timely manner.',
  },
  {
    question: 'How do I know which platform is best for my project?',
    answer:
      "I can help you decide based on your target audience, budget, and project goals. Whether it's a website, a mobile app, or both, we’ll find the perfect fit.",
  },
  {
    question: 'Will I be able to update my website by myself?',
    answer:
      'Absolutely. I provide tools and training for you to manage content and keep your site updated without needing technical expertise.',
  },
  {
    question:
      'What kind of support can I expect after my website or app launches?',
    answer:
      'I offer post-launch support to address any immediate issues and provide ongoing maintenance packages for continual improvements and updates.',
  },
  {
    question:
      'Do you offer any training or user manuals for the sites you develop?',
    answer:
      'Yes, I provide user-friendly training and documentation tailored to your needs so you can confidently manage your website or app.',
  },
  {
    question:
      'How do you handle changes or new features requests during development?',
    answer:
      'I adopt an agile development approach, allowing for flexibility to accommodate changes and incorporate new features as the project evolves.',
  },
  {
    question: "What's required from me to start a project with you?",
    answer:
      "Just your vision! We'll start with a discussion about your goals and requirements, and I'll guide you through every step of the process.",
  },
  {
    question: 'Can you integrate e-commerce capabilities into my website?',
    answer:
      'Certainly, I can build a secure and intuitive e-commerce platform tailored to your business needs, ensuring a seamless shopping experience for your customers.',
  },
  {
    question: 'How do you measure the success of a website or app you develop?',
    answer:
      "Success is measured by meeting the goals we set together, whether it's increased traffic, sales, user engagement, or all of the above.",
  },
];

export const PROJECT_STATUS: ProjectStatus[] = [
  'completed',
  'ongoing',
  'paused',
];

export const PROJECTS: Project[] = [
  {
    title: 'Zim',
    description:
      'An android file manager featuring a clean UI & multi-threaded processing, offering essential features like file organization, renaming, and decompression.',
    tech: ['Flutter', 'Dart', 'Kotlin'],
    status: 'completed',
    image: '/imgs/avatar.webp',
    href: null,
    source: 'https://github.com/Maiz27/zim',
  },
  {
    title: 'Sahil',
    description:
      'Sahil is a platform  linking businesses with suppliers and customers, facilitating automated procurement and distribution of goods. ',
    tech: [
      'Turborepo',
      'Next.js',
      'Express.js',
      'Tailwind CSS',
      'Hasura',
      'GraphQL',
      'TypeScript',
    ],
    status: 'ongoing',
    image: '/imgs/avatar.webp',
    href: 'https://sahil.app/',
    source: 'https://github.com/Sahil-Connect/sahil',
  },
  {
    title: 'Amigos',
    description:
      'Amigos Restaurant in Juba: Savor the blend of local and global flavors at a friendly spot where every meal is a celebration of community.',
    tech: ['Vite', 'React', 'Sass', 'Firebase', 'Netlify', 'JavaScript'],
    status: 'completed',
    image: '/imgs/avatar.webp',
    href: 'https://amigos211.netlify.app/',
    source: null,
  },
];

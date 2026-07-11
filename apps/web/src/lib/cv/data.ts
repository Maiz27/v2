/**
 * CV content, shaped like a future Sanity `cv` document (summary, experience[],
 * projects[], education, skillGroups[]) so a later PR can swap this import for a
 * GROQ query without touching the page. Kept as typed data for now.
 *
 * Separator convention matches the rest of the site: " / " between stack items.
 */

export type CvRole = {
  title: string;
  org: string;
  place: string;
  /** Human-readable range, e.g. "October 2022 to Present". */
  dates: string;
  bullets: string[];
  /** Stack, " / " separated. */
  tech: string;
};

export type CvProject = {
  name: string;
  meta: string;
  href: string;
  hrefLabel: string;
  blurb: string;
};

export type CvEducation = {
  degree: string;
  place: string;
  detail: string;
};

export type CvSkillGroup = {
  label: string;
  items: string;
};

export type CvData = {
  summary: string;
  experience: CvRole[];
  projects: CvProject[];
  education: CvEducation;
  skillGroups: CvSkillGroup[];
};

export const CV: CvData = {
  summary:
    'Full stack developer with four-plus years shipping web and mobile products, from client sites out of Juba to a chess platform and a card game with a rules engine of its own. I like the parts other people skip: the rate limits, the reconnection logic, the tests that keep a fast build honest. I write down how I build, and the reasoning is usually the point.',

  experience: [
    {
      title: 'Software Engineer',
      org: 'Nilotik',
      place: 'Juba, South Sudan',
      dates: 'October 2022 to Present',
      bullets: [
        'Led delivery of client work including Mogz Studio, The Union Legal and Global Links Auto, building responsive, performance-minded sites in React and TypeScript.',
        'Cut project delivery time by streamlining the front-end build with lazy loading and code splitting.',
        'Trimmed bundle size and improved UI performance through tree-shaking and careful component boundaries.',
      ],
      tech: 'React / Next.js / TypeScript / Framer Motion / Jest',
    },
    {
      title: 'Full Stack Developer',
      org: 'Sahil',
      place: 'Kigali, Rwanda',
      dates: 'January 2024 to June 2026',
      bullets: [
        'Increased development efficiency by roughly 40% by reworking the front-end architecture in React and TypeScript, leaning on memoization and lazy loading to keep the app fast as it grew.',
        'Built a set of reusable UI components that smoothed onboarding for over 100 businesses.',
        'Mentored 3 interns in React practices and component testing with Jest and React Testing Library, lifting code quality on the work they touched.',
      ],
      tech: 'React / TypeScript / GraphQL / Hasura / Turborepo / Jest',
    },
  ],

  projects: [
    {
      name: 'Hareeg Table',
      meta: 'Flutter / Dart / 2026, ongoing',
      href: 'https://maiz27.github.io/hareeg-table/',
      hrefLabel: 'maiz27.github.io/hareeg-table',
      blurb:
        'An offline, ad-free card game of Classic Hareeg: one human against three CPUs across a four-tier difficulty ladder that genuinely knows the game. The rules live in one pure-Dart engine nothing can reach around. Built fast with AI agents and kept correct with the guardrails around them: unit, integration and regression tests, an invariant sweep that drives full matches, golden replays, and automated review in CI. Around 87,000 lines across the app and its tests; one codebase ships to Android, web and desktop.',
    },
    {
      name: 'Follow Sync',
      meta: 'Next.js / TypeScript / 2025',
      href: 'https://github.com/Maiz27/follow-sync',
      hrefLabel: 'github.com/Maiz27/follow-sync',
      blurb:
        'A GitHub network auditor that runs with no server to maintain and no database I pay for. Each user signs in with their own GitHub OAuth quota and the browser does the long-running work, so it handles networks in the tens of thousands: adaptive refresh windows, retries with exponential backoff, and a private Gist standing in for the database. It even classifies deleted accounts by reading the GraphQL and REST APIs against each other, spending no extra quota.',
    },
    {
      name: 'Stalemates',
      meta: 'SvelteKit / TypeScript / 2024',
      href: 'https://stalemates.magedfaiz.xyz/',
      hrefLabel: 'stalemates.magedfaiz.xyz',
      blurb:
        'A chess platform where both the AI and multiplayer modes extend one tested rulebook. The Stockfish engine runs in a Web Worker over the UCI protocol so the board never freezes, and a single difficulty setting fans out into six engine parameters so easy games feel human rather than just weak. Multiplayer runs on a small Node and ws server with session-based reconnection and clocks that survive a dropped connection.',
    },
  ],

  education: {
    degree: 'BSc Computer Science',
    place: 'Future University, Khartoum, Sudan',
    detail: 'CGPA 3.59',
  },

  skillGroups: [
    {
      label: 'Languages',
      items: 'TypeScript / JavaScript / Dart / Python / HTML / CSS / Sass',
    },
    {
      label: 'Frameworks',
      items: 'React / Next.js / SvelteKit / Flutter / Tailwind CSS',
    },
    {
      label: 'Platform & data',
      items:
        'Node / GraphQL / GitHub GraphQL API / REST / WebSockets / Web Workers / Sanity + Portable Text / Shiki / Turborepo',
    },
    {
      label: 'Practice',
      items:
        'Sanity TypeGen / Jest / React Testing Library / testing and CI guardrails for AI-assisted work',
    },
  ],
};

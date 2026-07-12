/**
 * Owner identity and primary navigation, shared across the Ledger chrome
 * (masthead, footer, CV). Contact is a mailto link, not a form. Kept as plain
 * data so a later PR can move it into Sanity without touching the components.
 */
export const OWNER = {
  name: 'Maged Faiz',
  role: 'Full Stack Developer',
  email: 'magedfaiz98@gmail.com',
  github: 'https://github.com/Maiz27',
  githubLabel: 'github.com/Maiz27',
  linkedin: 'https://www.linkedin.com/in/maiz27',
  linkedinLabel: 'linkedin.com/in/maiz27',
  site: 'https://www.magedfaiz.xyz',
  siteLabel: 'magedfaiz.xyz',
  cv: '/cv',
} as const;

export const NAV = [
  { name: 'Index', href: '/' },
  { name: 'Archive', href: '/projects' },
  { name: 'CV', href: '/cv' },
] as const;

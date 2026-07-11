export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

export const BASEURL = `https://www.${DOMAIN}`;

export const EMAIL = process.env.NEXT_PUBLIC_EMAIL;

export const CODE_ID_PREFIX = 'Snippet-';

export const ROUTES = [
  { name: 'Index', href: '/' },
  { name: 'Archive', href: '/projects' },
  { name: 'CV', href: '/cv' },
];

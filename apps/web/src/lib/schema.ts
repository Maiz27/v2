import { Person } from 'schema-dts';
import { BASEURL, EMAIL } from '@/lib/Constants';

/**
 * Person JSON-LD, shared by the home page and every case study. Lives in a lib
 * module (not a page export) so route files export only Next's page contract.
 */
export const PersonSchema: Person = {
  '@type': 'Person',
  name: 'Maged Faiz Ismail',
  gender: 'Male',
  jobTitle: 'Full Stack Developer',
  birthDate: '1998-11-22',
  email: EMAIL,
  disambiguatingDescription:
    'Maged Faiz is a full stack developer who documents his work as long-form, first-person case studies grounded in real code.',
  alumniOf: 'Future University Khartoum',
  url: BASEURL,
};

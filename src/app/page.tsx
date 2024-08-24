import AboutCard from '@/components/about/AboutCard';
import Services from '@/components/services/Services';
import Experience from '@/components/experience/Experience';
import ActivityCalendar from '@/components/github/ActivityCalendar';
import FeaturedProjects from '@/components/projects/FeaturedProjects';
import { Person } from 'schema-dts';
import JsonLd from '@/components/jsonLd/JsonLd';
import { BASEURL, EMAIL } from '@/lib/Constants';

export const revalidate = 60;

export const PersonSchema: Person = {
  '@type': 'Person',
  name: 'Maged Faiz Ismail',
  gender: 'Male',
  jobTitle: 'Full Stack Developer',
  birthDate: '1998-11-22',
  email: EMAIL,
  disambiguatingDescription:
    'Maged Faiz is An Innovative Full Stack Developer. Skilled in leading end-to-end projects, crafting intuitive interfaces, and delivering scalable solutions that drive business growth.',
  alumniOf: 'Future University Khartoum',
  url: BASEURL,
};

export default function Home() {
  return (
    <main>
      <JsonLd schema={PersonSchema} />

      <AboutCard />

      <FeaturedProjects />

      <Experience />

      <Services />

      <ActivityCalendar />
    </main>
  );
}

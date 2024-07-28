import AboutCard from '@/components/about/AboutCard';
import Experience from '@/components/experience/Experience';
import Services from '@/components/services/Services';
import FeaturedProjects from '@/components/projects/FeaturedProjects';
import { getPageMetadata } from '@/lib/utilities';
import { Person } from 'schema-dts';
import JsonLd from '@/components/jsonLd/JsonLd';

export const revalidate = 60;

export const metadata = getPageMetadata('home');

export default function Home() {
  const schema: Person = {
    '@type': 'Person',
    name: 'Maged Faiz Ismail',
    gender: 'Male',
    jobTitle: 'Full Stack Developer',
    birthDate: '1998-11-22',
    disambiguatingDescription:
      'Maged Faiz is An Innovative Full Stack Developer. Skilled in leading end-to-end projects, crafting intuitive interfaces, and delivering scalable solutions that drive business growth.',
    alumniOf: 'Future University Khartoum',
    url: metadata.openGraph!.url?.toString(),
  };

  return (
    <main>
      <JsonLd schema={schema} />

      <AboutCard />

      <FeaturedProjects />

      <Experience />

      <Services />
    </main>
  );
}

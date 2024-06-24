import AboutCard from '@/components/about/AboutCard';
import Experience from '@/components/experience/Experience';
import Services from '@/components/services/Services';
import FeaturedProjects from '@/components/projects/FeaturedProjects';
import { getPageMetadata } from '@/lib/utilities';

export const revalidate = 60;

export const metadata = getPageMetadata('home');

export default function Home() {
  return (
    <main>
      <AboutCard />

      <FeaturedProjects />

      <Experience />

      <Services />
    </main>
  );
}

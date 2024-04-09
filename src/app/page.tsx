import AboutCard from '@/components/about/AboutCard';
import Experience from '@/components/experience/Experience';
import Services from '@/components/services/Services';
import FeaturedProjects from '@/components/projects/FeaturedProjects';

export default function Home() {
  return (
    <main>
      <AboutCard />

      <Experience />

      <Services />

      <FeaturedProjects />
    </main>
  );
}

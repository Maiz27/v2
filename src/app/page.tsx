import AboutCard from '@/components/about/AboutCard';
import Experience from '@/components/experience/Experience';
import Projects from '@/components/projects/Projects';
import Services from '@/components/services/Services';

export default function Home() {
  return (
    <main>
      <AboutCard />

      <Experience />

      <Services />

      <Projects />
    </main>
  );
}

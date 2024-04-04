import AboutCard from '@/components/about/AboutCard';
import Experience from '@/components/experience/Experience';
import Services from '@/components/services/Services';

export default function Home() {
  return (
    <main>
      <AboutCard />

      <Experience />

      <Services />

      <div className='min-h-screen'></div>
    </main>
  );
}

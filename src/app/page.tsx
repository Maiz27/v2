import AboutCard from '@/components/about/AboutCard';
import Experience from '@/components/experience/Experience';

export default function Home() {
  return (
    <main>
      <AboutCard />

      <Experience />
      <div className='min-h-screen'></div>
    </main>
  );
}

import Masthead from '@/components/layout/Masthead';
import SiteFooter from '@/components/layout/SiteFooter';
import ArchiveTable from '@/components/projects/ArchiveTable';
import { fetchSanityData } from '@/lib/sanity/client';
import { getProjects } from '@/lib/sanity/queries';
import { getDynamicMetaData } from '@/lib/utilities';
import { GetProjectsResult } from '@/lib/sanity/types';

export const revalidate = 60;

export async function generateMetadata() {
  const data = await getDynamicMetaData('/projects');
  return data;
}

const Projects = async () => {
  const projects: GetProjectsResult = await fetchSanityData(getProjects);

  return (
    <div className='mx-auto max-w-4xl px-6 md:px-10'>
      <Masthead />

      <section className='py-14 md:py-20'>
        <p className='mb-5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-mark'>
          The full index
        </p>
        <h1 className='font-display text-[clamp(2.25rem,5vw,3.5rem)] font-black leading-[1.05] tracking-tight'>
          Archive
        </h1>
        <p className='mt-6 max-w-[54ch] text-[1.0625rem] leading-[1.7] text-ink-soft'>
          Every project here has a full case study. This is the whole index; the
          home page just keeps a shorter list of it. Filter by kind, or read
          any of them end to end.
        </p>
      </section>

      <ArchiveTable projects={projects} />

      <SiteFooter />
    </div>
  );
};

export default Projects;

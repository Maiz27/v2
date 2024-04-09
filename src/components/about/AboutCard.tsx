import CTA from '@/components/CTA/CTA';
import Tools from '@/components/tools/Tools';
import ImageCard from '@/components/imageCard/ImageCard';
import { getAboutMe } from '@/lib/sanity/queries';
import { fetchSanityData } from '@/lib/sanity/client';
import { AboutMe, AboutMeStats } from '@/lib/types';
import { HiOutlineSquare3Stack3D, HiOutlineEnvelope } from 'react-icons/hi2';

export const revalidate = 60;

const AboutCard = async () => {
  const about: AboutMe = await fetchSanityData(getAboutMe);

  const { name, bio, imageUrl, stats } = about;

  return (
    <section className='flex flex-col gap-8 items-center'>
      <div className='flex flex-col lg:flex-row justify-center items-start lg:items-center gap-4'>
        <div className='flex justify-center items-center gap-4'>
          <div className='size-32 lg:size-60 xl:size-72 2xl:size-80 overflow-hidden rounded-lg'>
            <ImageCard src={imageUrl} />
          </div>
          <div className='lg:hidden'>
            <span className='opacity-100 font-semibold text-primary'>
              Hello I Am
            </span>
            <h1 className='font-bold text-3xl'>{name}</h1>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='hidden lg:block'>
            <span className='opacity-100 font-semibold text-primary'>
              Hello I Am
            </span>
            <h1 className='font-bold text-4xl'>{name}</h1>
          </div>
          <p className='lg:text-balance'>{bio}</p>
          <div className='flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-4'>
            <CTA
              text='Email Me'
              href='mailto:email@me.com'
              external={true}
              icon={<HiOutlineEnvelope />}
            />
            <CTA
              text='My Projects'
              href='/projects'
              icon={<HiOutlineSquare3Stack3D />}
            />
          </div>
        </div>
      </div>
      <div className='w-full space-y-8'>
        <Tools />
        <Stats stats={stats} />
      </div>
    </section>
  );
};

export default AboutCard;

const Stats = ({ stats }: { stats: AboutMeStats }) => {
  const { clients, experience, projects, contributions } = stats;

  const list = [
    {
      count: clients,
      label: 'Happy Clients',
    },
    {
      count: experience,
      label: 'Years of Experience',
    },
    {
      count: projects,
      label: 'Projects Completed',
    },
    {
      count: contributions,
      label: 'Contributions',
    },
  ];
  return (
    <div className='grid place-items-center grid-cols-2 lg:grid-cols-4 gap-5 py-5 border-b border-copy/10'>
      {list.map(({ count, label }) => (
        <div
          key={label}
          className='w-full flex flex-col gap-2 justify-center items-center'
        >
          <span className='text-4xl font-bold opacity-100 text-primary'>
            {count}+
          </span>
          <span className='font-bold'>{label}</span>
        </div>
      ))}
    </div>
  );
};

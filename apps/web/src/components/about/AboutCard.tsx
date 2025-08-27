import Image from 'next/image';
import CTA from '@/components/CTA/CTA';
import BoxesReveal from '../animationWrappers/BoxesReveal';
import AnimateInView from '../animationWrappers/AnimateInView';
import { getAboutMe } from '@/lib/sanity/queries';
import { fetchSanityData } from '@/lib/sanity/client';
import { HiOutlineSquare3Stack3D, HiOutlineEnvelope } from 'react-icons/hi2';
import { GetAboutMeResult, Stats as StatsType } from '@/lib/sanity/types';

export const revalidate = 60;

const AboutCard = async () => {
  const result: GetAboutMeResult = await fetchSanityData(getAboutMe);

  if (!result) {
    return null;
  }

  const { name, bio, imageUrl, stats } = result;

  return (
    <section className='flex flex-col gap-8 items-center'>
      <ProfileSection name={name} bio={bio} imageUrl={imageUrl!} />
      <Stats stats={stats} />
    </section>
  );
};

export default AboutCard;

const ProfileSection = ({
  name,
  bio,
  imageUrl,
}: {
  name: string;
  bio: string;
  imageUrl: string;
}) => (
  <div className='flex flex-col lg:flex-row justify-center items-start lg:items-center gap-4'>
    <ProfileImage name={name} imageUrl={imageUrl} />
    <ProfileInfo name={name} bio={bio} />
  </div>
);

const ProfileImage = ({
  name,
  imageUrl,
}: {
  name: string;
  imageUrl: string;
}) => (
  <div className='flex justify-center items-center gap-4'>
    <BoxesReveal
      once={false}
      className='size-32 lg:size-60 xl:size-72 2xl:size-80 overflow-hidden rounded-lg'
    >
      <Image
        src={imageUrl}
        width={240}
        height={240}
        title={name}
        alt={name}
        className='h-full w-full object-scale-down'
      />
    </BoxesReveal>
    <AnimateInView className='lg:hidden'>
      <Intro name={name} />
    </AnimateInView>
  </div>
);

const ProfileInfo = ({ name, bio }: { name: string; bio: string }) => (
  <div className='space-y-4'>
    <AnimateInView className='hidden lg:block'>
      <Intro name={name} />
    </AnimateInView>
    <AnimateInView tag='p' delay={0.8} className='lg:text-balance'>
      {bio}
    </AnimateInView>
    <CTAButtons />
  </div>
);

const Intro = ({ name }: { name: string }) => (
  <>
    <span className='opacity-100 font-semibold text-primary'>Hello I Am</span>
    <h1 className='font-bold text-3xl'>{name}</h1>
  </>
);

const CTAButtons = () => (
  <div className='flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-4'>
    <AnimateInView delay={1.2} className='w-full'>
      <CTA
        text='My Projects'
        href='/projects'
        icon={<HiOutlineSquare3Stack3D />}
      />
    </AnimateInView>
    <AnimateInView delay={1.6} className='w-full'>
      <CTA text='Get In Touch' href='/contact' icon={<HiOutlineEnvelope />} />
    </AnimateInView>
  </div>
);

const Stats = ({ stats }: { stats: StatsType }) => {
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
    <AnimateInView
      delay={2.4}
      className='w-full grid place-items-center grid-cols-2 lg:grid-cols-4 gap-5 py-5 border-b border-border'
    >
      {list.map(({ count, label }, idx) => (
        <AnimateInView
          delay={2.4 + 0.4 * idx}
          key={label}
          className='w-full flex flex-col gap-2 justify-center items-center'
        >
          <span className='text-4xl font-bold opacity-100 text-primary'>
            {count}+
          </span>
          <span className='font-bold'>{label}</span>
        </AnimateInView>
      ))}
    </AnimateInView>
  );
};

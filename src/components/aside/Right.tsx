import IconCTA from '../CTA/IconCTA';
import { socials } from '@/lib/Constants';

const Right = () => {
  return (
    <aside className='hidden xl:flex xl:flex-col justify-center items-center gap-4 sticky top-0 h-screen w-1/6'>
      {socials.map(({ icon, name, href }) => (
        <IconCTA key={href} Icon={icon} name={name} href={href} />
      ))}
    </aside>
  );
};

export default Right;

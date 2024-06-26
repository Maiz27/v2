import IconCTA from '../CTA/IconCTA';
import { SOCIALS } from '@/lib/Constants';

const Right = () => {
  return (
    <aside className='hidden xl:flex xl:flex-col justify-center items-center gap-4 sticky top-0 h-screen w-1/6 2xl:w-1/5'>
      {SOCIALS.map(({ icon, name, href }) => (
        <IconCTA key={href} icon={icon} name={name} href={href} />
      ))}
    </aside>
  );
};

export default Right;

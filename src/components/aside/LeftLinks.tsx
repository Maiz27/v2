'use client';
import { usePathname } from 'next/navigation';
import AnimatedIconCTA from '../CTA/AnimatedIconCTA';
import { ROUTES } from '@/lib/Constants';

const LeftLinks = () => {
  const pathname = usePathname();
  return (
    <div className='flex flex-col justify-center gap-4'>
      {ROUTES.map(({ icon, name, href, x }) => (
        <AnimatedIconCTA
          key={href}
          Icon={icon}
          name={name}
          href={href}
          x={x!}
          isActive={href === pathname}
        />
      ))}
    </div>
  );
};

export default LeftLinks;

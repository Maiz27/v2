import { ReactNode } from 'react';

type props = {
  icon: JSX.Element;
  heading: string;
  paragraph?: string;
  Tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl';
  children?: ReactNode;
};

const Heading = ({
  heading,
  paragraph,
  icon,
  Tag = 'h2',
  size = '4xl',
  children,
}: props) => {
  return (
    <div className='space-y-6 border-b border-copy/10 py-6'>
      <Tag className='flex items-center gap-2'>
        <span className='opacity-100 text-3xl'>{icon}</span>
        <span className={`opacity-100 text-3xl lg:text-${size}`}>
          {heading}
        </span>
      </Tag>
      {paragraph && <p>{paragraph}</p>}
      {children}
    </div>
  );
};

export default Heading;

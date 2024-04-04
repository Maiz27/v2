type props = {
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
  icon: JSX.Element;
  text: string;
  isCentered?: boolean;
};

const Heading = ({
  Tag = 'h2',
  text,
  icon,
  size = '4xl',
  isCentered = false,
}: props) => {
  return (
    <Tag className='flex items-center gap-2'>
      <span className='opacity-100 text-3xl'>{icon}</span>
      <span className={`opacity-100 text-3xl lg:text-${size}`}>{text}</span>
    </Tag>
  );
};

export default Heading;

import { JSX } from 'react';
import BaseCard from './BaseCard';
import { HiOutlineExclamationCircle } from 'react-icons/hi2';

type Props = {
  icon?: JSX.Element;
  heading: string;
  paragraph: string;
};

const EmptyState = ({
  icon = <HiOutlineExclamationCircle />,
  heading,
  paragraph,
}: Props) => {
  return (
    <BaseCard delay={1} hasHoverStrips={false} className='my-8'>
      <div className='flex flex-col items-center space-y-8'>
        <div className='flex flex-col items-center space-y-2 text-3xl'>
          {icon}

          <h3 className='text-2xl lg:text-3xl'>{heading}</h3>
        </div>
        <p className='max-w-lg text-center mx-auto'>{paragraph}</p>
      </div>
    </BaseCard>
  );
};

export default EmptyState;

import Link from 'next/link';
import React, { ReactElement } from 'react';

type ButtonProps = {
  icon: ReactElement;
  name: string;
  onClick: () => void;
  className?: string;
};

type LinkProps = {
  icon: ReactElement;
  name: string;
  href: string;
  className?: string;
};

type Props = ButtonProps | LinkProps;

const IconCTA = (props: Props) => {
  const { icon, name, className } = props;

  const content = (
    <div className='p-4 rounded-xl text-lg transition-colors opacity-70 hover:opacity-100 hover:text-primary hover:border-primary bg-foreground border border-border cursor-pointer'>
      {icon}
    </div>
  );

  if ('onClick' in props) {
    return (
      <button title={name} onClick={props.onClick} className={` ${className}`}>
        {content}
      </button>
    );
  }

  return (
    <a
      title={name}
      href={props.href}
      target='_blank'
      className={` ${className}`}
    >
      {content}
    </a>
  );
};

export default IconCTA;

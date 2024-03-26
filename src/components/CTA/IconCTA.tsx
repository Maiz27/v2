import Link from 'next/link';
import React, { ReactElement } from 'react';

type ButtonProps = {
  Icon: ReactElement;
  name: string;
  onClick: () => void;
};

type LinkProps = {
  Icon: ReactElement;
  name: string;
  href: string;
};

type Props = ButtonProps | LinkProps;

const IconCTA = (props: Props) => {
  const { Icon, name } = props;

  const content = (
    <div className='p-4 rounded-xl text-lg transition-colors opacity-70 hover:opacity-100 bg-foreground border border-copy/10 cursor-pointer'>
      {Icon}
    </div>
  );

  if ('onClick' in props) {
    return (
      <button title={name} onClick={props.onClick}>
        {content}
      </button>
    );
  }

  return (
    <a title={name} href={props.href} target='_blank'>
      {content}
    </a>
  );
};

export default IconCTA;

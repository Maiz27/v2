import Link from 'next/link';
import React, { MouseEventHandler, ReactNode } from 'react';

interface CTAProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
  type?: 'button' | 'reset' | 'submit';
  isBtn?: boolean;
  title?: string;
  loading?: boolean;
  className?: string;
}

const CTA = ({
  children,
  onClick = () => {},
  href,
  type = 'button',
  isBtn = true,
  className = '',
  loading,
  title,
}: CTAProps) => {
  if (isBtn) {
    return (
      <button
        type={type}
        onClick={onClick}
        title={title}
        className={`hover:text-primary hover:scale-110 active:scale-90 transition-all shadow-2xl ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      href={href!}
      title={title}
      className={`hover:text-primary hover:scale-110 active:scale-90 transition-all shadow-2xl ${className}`}
    >
      {children}
    </Link>
  );
};
export default CTA;

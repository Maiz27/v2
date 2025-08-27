'use client';
import Link from 'next/link';
import React, {
  MouseEventHandler,
  ReactElement,
  useCallback,
  useRef,
  useState,
} from 'react';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

type ButtonProps = {
  text: string;
  icon?: ReactElement;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'reset' | 'submit';
  loading?: boolean;
  title?: string;
  className?: string;
};

type LinkProps = {
  text: string;
  icon?: ReactElement;
  href: string;
  title?: string;
  className?: string;
  external?: boolean;
};

type CTAProps = ButtonProps | LinkProps;

const CTA = (props: CTAProps) => {
  const { text, className = '', title, icon } = props;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [_text, setText] = useState(text);

  const scramble = useCallback(() => {
    let iteration = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = text
        .split('')
        .map((_, index) => {
          if (index < iteration) {
            return text[index];
          }

          return LETTERS[Math.floor(Math.random() * LETTERS.length)];
        })
        .join('');

      setText(scrambled);

      if (iteration >= text.length) {
        stopScramble();
      }

      iteration += 1 / 4;
    }, 30);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const stopScramble = useCallback(() => {
    clearInterval(intervalRef.current || undefined);

    setText(text);
  }, [text]);

  const commonProps = {
    onMouseEnter: scramble,
    onMouseLeave: stopScramble,
    onTouchStart: scramble,
    onTouchEnd: stopScramble,
    className: `flex justify-center items-center gap-2 bg-foreground rounded-lg w-full py-3 border border-copy/5 hover:border-primary uppercase opacity-70 hover:opacity-100 hover:text-primary transition-colors group ${className}`,
  };

  if ('onClick' in props) {
    const { onClick, type = 'button', loading } = props;
    return (
      <button
        type={type}
        title={title}
        disabled={loading}
        onClick={onClick}
        {...commonProps}
      >
        <div className='text-2xl text-primary'>{icon}</div>
        <span className='group-hover:opacity-100'>{_text}</span>
      </button>
    );
  }

  if ('href' in props) {
    const external = props.external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};
    return (
      <Link href={props.href} {...commonProps} {...external}>
        <div className='text-xl text-primary'>{icon}</div>
        <span className='group-hover:opacity-100'>{_text}</span>
      </Link>
    );
  }
};

export default React.memo(CTA);

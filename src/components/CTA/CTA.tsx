'use client';
import Link from 'next/link';
import React, {
  MouseEventHandler,
  ReactElement,
  useCallback,
  useRef,
  useState,
} from 'react';

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = '!@#$%^&*():{};|,.<>/?';

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
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = text
        .split('')
        .map((char, index) =>
          pos / CYCLES_PER_LETTER > index
            ? char
            : CHARS[Math.floor(Math.random() * CHARS.length)]
        )
        .join('');

      setText(scrambled);
      pos++;

      if (pos >= text.length) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
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
    className: `flex justify-center items-center gap-2 bg-foreground rounded-lg w-full py-3 border border-copy/5 hover:border-primary uppercase opacity-70 hover:opacity-100 hover:text-primary transition-colors ${className}`,
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
        <span>{_text}</span>
      </button>
    );
  }

  if ('href' in props) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target='_blank'
          rel='noopener noreferrer'
          {...commonProps}
        >
          <div className='text-xl text-primary'>{icon}</div>
          <span>{_text}</span>
        </a>
      );
    }
    return (
      <Link href={props.href} {...commonProps}>
        <div className='text-xl text-primary'>{icon}</div>
        <span>{_text}</span>
      </Link>
    );
  }
};

export default React.memo(CTA);

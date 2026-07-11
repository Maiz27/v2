import { Fragment } from 'react';

type Props = {
  text: string;
  className?: string;
};

/**
 * The home headline, the centerpiece. Each letter is pressed onto the page in
 * sequence (see `.hero-letter` in globals.css, gated by the motion attribute).
 * The visible letters are aria-hidden and paired with an sr-only copy of the
 * full string so screen readers hear one clean line. A trailing period is inked
 * red as a terminal accent, a small nod to a cursor blinking after the line.
 */
const HeroTitle = ({ text, className }: Props) => {
  const hasTerminalPeriod = text.endsWith('.');
  const body = hasTerminalPeriod ? text.slice(0, -1) : text;
  const chars = [...body];

  let letterIndex = 0;

  return (
    <h1 className={className}>
      <span className='sr-only'>{text}</span>
      <span aria-hidden='true'>
        {chars.map((char, i) => {
          if (char === ' ') {
            return <Fragment key={i}> </Fragment>;
          }
          const li = letterIndex++;
          return (
            <span
              key={i}
              className='hero-letter'
              style={{ '--li': li } as React.CSSProperties}
            >
              {char}
            </span>
          );
        })}
        {hasTerminalPeriod && (
          <span
            className='hero-letter text-mark'
            style={{ '--li': letterIndex } as React.CSSProperties}
          >
            .
          </span>
        )}
      </span>
    </h1>
  );
};

export default HeroTitle;

import { Fragment } from 'react';

type Props = {
  text: string;
  className?: string;
};

/**
 * The home headline, the centerpiece. Each letter is pressed onto the page in
 * sequence (see `.hero-letter` in globals.css, gated by the motion attribute).
 * Letters are grouped per word in a nowrap wrapper so a line can only ever
 * break between words, never mid-word. The visible letters are aria-hidden and
 * paired with an sr-only copy of the full string so screen readers hear one
 * clean line. A trailing period is inked red as a terminal accent, a small nod
 * to a cursor blinking after the line.
 */
const HeroTitle = ({ text, className }: Props) => {
  const hasTerminalPeriod = text.endsWith('.');
  const body = hasTerminalPeriod ? text.slice(0, -1) : text;
  const words = body.split(' ');

  let letterIndex = 0;

  return (
    <h1 className={className}>
      <span className='sr-only'>{text}</span>
      <span aria-hidden='true'>
        {words.map((word, wi) => {
          const isLast = wi === words.length - 1;
          return (
            <Fragment key={wi}>
              <span className='inline-block whitespace-nowrap'>
                {word.split('').map((char, ci) => {
                  const li = letterIndex++;
                  return (
                    <span
                      key={ci}
                      className='hero-letter'
                      style={{ '--li': li } as React.CSSProperties}
                    >
                      {char}
                    </span>
                  );
                })}
                {isLast && hasTerminalPeriod && (
                  <span
                    className='hero-letter text-mark'
                    style={{ '--li': letterIndex++ } as React.CSSProperties}
                  >
                    .
                  </span>
                )}
              </span>
              {!isLast && ' '}
            </Fragment>
          );
        })}
      </span>
    </h1>
  );
};

export default HeroTitle;

'use client';

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ComponentPropsWithoutRef,
} from 'react';

type RevealProps<T extends ElementType> = {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

/**
 * Marks its root with `data-inview` the first time it scrolls into view, so the
 * ledger's hairline rules can draw themselves in (see the `.draw-b` rules in
 * globals.css). Motion itself is gated in CSS by `[data-motion='on']`; this
 * only reports visibility, so with the gate closed the element simply renders
 * at rest. Falls back to visible if IntersectionObserver is unavailable.
 */
const Reveal = <T extends ElementType = 'div'>({
  as,
  children,
  ...rest
}: RevealProps<T>) => {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      const frame = window.requestAnimationFrame(() => setInView(true));
      return () => window.cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-inview={inView ? '' : undefined} {...rest}>
      {children}
    </Tag>
  );
};

export default Reveal;

'use client';

import { ComponentProps, lazy, Suspense } from 'react';

type Props = {
  name: string;
} & ComponentProps<'svg'>;

const importSvg = (name: string) => {
  return lazy(() =>
    import(`@/assets/tools/${name}.svg`).catch(() => ({
      default: () => <span>{name}</span>,
    }))
  );
};

const SvgTool = ({ name, ...props }: Props) => {
  const SVG = importSvg(name);

  return (
    <Suspense fallback={<span>{name}</span>}>
      <SVG {...props} />
    </Suspense>
  );
};

export default SvgTool;

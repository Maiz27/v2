import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';

type Props = {
  name: string;
} & ComponentProps<'svg'>;

const SvgTool = async ({ name, ...props }: Props) => {
  const SVG = dynamic(() => import(`@/assets/tools/${name}.svg`));
  return <SVG {...props} />;
};

export default SvgTool;

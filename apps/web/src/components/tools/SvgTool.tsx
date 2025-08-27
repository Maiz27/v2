'use client';

import { Tool } from '@/lib/types';
import { useEffect, useState } from 'react';

const SvgTool = ({ tool: { iconSource, iconSvg } }: { tool: Tool }) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    if (iconSource === 'custom' && iconSvg) {
      fetch(iconSvg)
        .then((res) => res.text())
        .then(setSvgContent);
    }
  }, [iconSource, iconSvg]);

  return <span dangerouslySetInnerHTML={{ __html: svgContent! }} />;
};

export default SvgTool;

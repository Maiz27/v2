'use client';

import { useEffect, useState } from 'react';
import { GetToolsResult } from '@/lib/sanity/types';

const SvgTool = ({
  tool: { iconSource, iconSvg },
}: {
  tool: GetToolsResult[number];
}) => {
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

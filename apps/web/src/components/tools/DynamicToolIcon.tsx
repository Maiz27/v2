import { Tool } from '@/lib/types';
import * as SiIcons from 'react-icons/si';
import SvgTool from './SvgTool';

type IconMap = { [key: string]: React.ComponentType<any> };

const allIcons: IconMap = { ...SiIcons };

const DynamicToolIcon = ({
  tool,
  className,
}: {
  tool: Tool;
  className?: string;
}) => {
  const { iconSource, iconName, iconSvg } = tool;

  if (iconSource === 'custom' && iconSvg) {
    // Important: Only use this with trusted SVG sources (like your own Sanity assets)
    // to prevent XSS vulnerabilities.
    return <SvgTool tool={tool} />;
  }

  if (iconSource === 'react-icons' && iconName) {
    const IconComponent = allIcons[iconName];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
  }

  return null; // or a fallback icon
};

export default DynamicToolIcon;

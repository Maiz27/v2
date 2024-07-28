import { Metadata } from 'next';
import { BASEURL, NON_STACK_TOOLS, TOOLS, METADATA } from './Constants';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

export const getDomain = (url: string) => {
  const { hostname } = new URL(url);
  const parts = hostname.split('.');
  if (parts.length > 2) {
    parts.shift();
  }
  return parts.join('.');
};

export const getToolDetails = (toolName: string) => {
  const tool = TOOLS.get(toolName);
  return tool ? { icon: tool.icon, href: tool.href } : null;
};

export const getStackToolsArray = () => {
  const filteredTOOLS = new Map(
    Array.from(TOOLS).filter(([name]) => !NON_STACK_TOOLS.includes(name))
  );

  return Array.from(filteredTOOLS);
};

export const roundYear = (dateString: string): number => {
  const date = new Date(dateString);
  const month = date.getMonth();
  const year = date.getFullYear();

  // If the month is less than 6 (January to May), round down
  // Otherwise, round up
  return month < 6 ? year : year + 1;
};

export const getMonthYear = (StringDate: string) => {
  const date = new Date(StringDate);
  return date
    .toLocaleString(undefined, { month: 'short', year: 'numeric' })
    .replace(' ', ', ');
};

export const getPageMetadata = (name: string): Metadata => {
  const pageMetaData = METADATA.get(name);

  return {
    metadataBase: new URL(BASEURL),
    title: pageMetaData.title,
    description: pageMetaData.description,
    alternates: {
      canonical: pageMetaData.url,
    },
    icons: {
      icon: pageMetaData.icon,
      shortcut: pageMetaData.icon,
      apple: pageMetaData.icon,
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: pageMetaData.icon,
      },
    },
    openGraph: {
      type: pageMetaData.type,
      url: pageMetaData.url,
      title: pageMetaData.title,
      description: pageMetaData.description,
      siteName: pageMetaData.title,
      images: [
        {
          url: pageMetaData.image,
        },
      ],
    } as OpenGraph,
    twitter: {
      card: 'summary_large_image',
      site: pageMetaData.url,
      images: [
        {
          url: pageMetaData.image,
        },
      ],
    },
  };
};

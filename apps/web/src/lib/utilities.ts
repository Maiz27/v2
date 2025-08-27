import { Metadata } from 'next';
import { BASEURL, NON_STACK_TOOLS, TOOLS } from './Constants';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { fetchSanityData } from './sanity/client';
import { getMetadata } from './sanity/queries';
import { SanityMetadata } from './types';

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

export const extractFilename = (name: string) => {
  const split = name.split(' ');
  return { name: split[0], link: split[1] };
};

export const smoothScrollToElement = (
  elementId: string,
  offset: number = 80
) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

export const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove all non-word characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
};

export const getDynamicMetaData = async (slug: string) => {
  const data: SanityMetadata = await fetchSanityData(getMetadata, { slug });

  if (!data.title) {
    return {};
  }

  return {
    metadataBase: new URL(BASEURL),
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `${BASEURL}${slug}`,
    },
    icons: {
      icon: '/imgs/logo/favicon.ico',
      shortcut: '/imgs/logo/favicon.ico',
      apple: '/imgs/logo/apple-touch-icon.png',
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: '/imgs/logo/apple-touch-icon.png',
      },
    },
    openGraph: {
      type: 'website',
      url: `${BASEURL}${slug}`,
      title: data.title,
      description: data.description,
      siteName: data.title,
      images: [
        {
          url: `${BASEURL}/imgs/logo/logo.png`,
        },
      ],
    } as OpenGraph,
    twitter: {
      card: 'summary_large_image',
      site: `${BASEURL}${slug}`,
      images: [
        {
          url: `${BASEURL}/imgs/logo/logo.png`,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': 50,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  } as Metadata;
};

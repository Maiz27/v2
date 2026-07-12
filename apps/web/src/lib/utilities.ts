import { Metadata } from 'next';
import { siteMetadata } from './data/siteMetadata';
import { buildMetadata } from './metadata';

export const getDomain = (url: string) => {
  const { hostname } = new URL(url);
  const parts = hostname.split('.');
  if (parts.length > 2) {
    parts.shift();
  }
  return parts.join('.');
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

export const getDynamicMetaData = async (slug: string): Promise<Metadata> => {
  const data = await siteMetadata.forSlug(slug);

  if (!data) {
    return {};
  }

  return buildMetadata({
    title: data.title,
    description: data.description,
    path: slug,
  });
};

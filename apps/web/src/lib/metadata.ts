import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { BASEURL } from './Constants';

/** The site logo, used as the default social image. */
const DEFAULT_IMAGE = `${BASEURL}/imgs/logo/logo.png`;

type BuildMetadataArgs = {
  title: string;
  description: string;
  /** Route path, e.g. '/projects/v2' or '/'. */
  path: string;
  /**
   * Social/OG image URL. Defaults to the site logo. Note the project metadata
   * projection returns a single URL string (`images[0].image.asset->url`), so
   * this is a string, not an array.
   */
  image?: string;
  type?: 'website' | 'article';
};

/**
 * The single source of truth for a page's Next `Metadata` object: icons, Open
 * Graph, Twitter card and robots. The route-level `getDynamicMetaData` and the
 * per-project `generateMetadata` both build this same block and had drifted
 * (the project route had regressed its apple-touch-icon to favicon.ico); they
 * now both call this so the output can't diverge again.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
}: BuildMetadataArgs): Metadata {
  const url = `${BASEURL}${path}`;
  const socialImage = image || DEFAULT_IMAGE;

  return {
    metadataBase: new URL(BASEURL),
    title,
    description,
    alternates: {
      canonical: url,
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
      type,
      url,
      title,
      description,
      siteName: title,
      images: [{ url: socialImage }],
    } as OpenGraph,
    twitter: {
      card: 'summary_large_image',
      site: url,
      images: [{ url: socialImage }],
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': 50,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  };
}

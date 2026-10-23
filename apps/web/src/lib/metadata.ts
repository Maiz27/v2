import { Metadata } from 'next';
import { BASEURL } from './Constants';
import { OWNER } from './site';

/**
 * The default social image: the site card rendered by app/opengraph-image.tsx.
 * Routes without their own opengraph-image file need it set explicitly,
 * because a page-level `openGraph` object replaces its parent's wholesale and
 * would otherwise drop the root card.
 */
const DEFAULT_IMAGE = `${BASEURL}/opengraph-image`;

/** X/Twitter handle for the site, if configured. */
const TWITTER_SITE = '@maiz27';

type BuildMetadataArgs = {
  title: string;
  description: string;
  /** Route path, e.g. '/projects/v2' or '/'. */
  path: string;
  /**
   * Social/OG image URL. Defaults to the site card. Note the project metadata
   * projection returns a single URL string (`images[0].image.asset->url`), so
   * this is a string, not an array. Pass `null` to emit no `images` at all so
   * a co-located opengraph-image file supplies them: Next only applies
   * file-based OG/Twitter images when the same segment's metadata has no
   * `images` key.
   */
  image?: string | null;
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
  // null: leave `images` unset (Next then fills Twitter from the file-based
  // OG image too); otherwise the given URL or the site card.
  const images =
    image === null ? {} : { images: [{ url: image || DEFAULT_IMAGE }] };

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
      siteName: OWNER.name,
      ...images,
    } as Metadata['openGraph'],
    twitter: {
      card: 'summary_large_image',
      ...(TWITTER_SITE ? { site: TWITTER_SITE } : {}),
      ...images,
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

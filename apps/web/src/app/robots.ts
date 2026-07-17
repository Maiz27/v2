import { MetadataRoute } from 'next';
import { BASEURL } from '@/lib/Constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASEURL}/sitemap.xml`,
  };
}

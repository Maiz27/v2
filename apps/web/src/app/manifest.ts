import { MetadataRoute } from 'next';
import { OWNER } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: OWNER.name,
    short_name: OWNER.name,
    // --color-paper (oklch 16% 0.012 240) in sRGB.
    background_color: '#090e12',
    theme_color: '#090e12',
    icons: [
      {
        src: '/imgs/logo/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/imgs/logo/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}

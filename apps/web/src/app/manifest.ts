import { MetadataRoute } from 'next';
import { OWNER } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: OWNER.name,
    short_name: OWNER.name,
    background_color: '#f4f1ea',
    theme_color: '#f4f1ea',
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

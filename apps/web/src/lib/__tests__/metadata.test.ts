import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/Constants', () => ({
  BASEURL: 'https://www.example.com',
}));

import { buildMetadata } from '@/lib/metadata';

describe('buildMetadata', () => {
  it('applies the shared defaults and apple touch icons', () => {
    const metadata = buildMetadata({
      title: 'Index',
      description: 'The index page.',
      path: '/',
    });

    expect(metadata).toMatchObject({
      title: 'Index',
      description: 'The index page.',
      alternates: { canonical: 'https://www.example.com/' },
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
        images: [{ url: 'https://www.example.com/imgs/logo/logo.png' }],
      },
      twitter: {
        card: 'summary_large_image',
        images: [{ url: 'https://www.example.com/imgs/logo/logo.png' }],
      },
    });
  });

  it('merges page-specific values into the shared metadata shape', () => {
    const metadata = buildMetadata({
      title: 'Case study',
      description: 'A project write-up.',
      path: '/projects/example',
      image: 'https://cdn.example.com/project.png',
      type: 'article',
    });

    expect(metadata).toMatchObject({
      title: 'Case study',
      description: 'A project write-up.',
      alternates: {
        canonical: 'https://www.example.com/projects/example',
      },
      openGraph: {
        type: 'article',
        url: 'https://www.example.com/projects/example',
        images: [{ url: 'https://cdn.example.com/project.png' }],
      },
      twitter: {
        images: [{ url: 'https://cdn.example.com/project.png' }],
      },
    });
  });
});

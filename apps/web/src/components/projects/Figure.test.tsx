import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

// next/image needs the Next runtime's image config; a plain <img> keeps the
// assertions on Figure's own markup.
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    sizes,
    preload,
    loading,
  }: {
    src: string;
    alt: string;
    sizes: string;
    preload?: boolean;
    loading?: 'eager' | 'lazy';
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      loading={loading}
      data-preload={preload ? 'true' : undefined}
    />
  ),
}));

import Figure from './Figure';
import Plate from './Plate';

const shot = (n: number, alt = `Shot ${n}`) => ({
  _key: `k${n}`,
  alt,
  url: `https://cdn.sanity.io/images/p/d/${n}.png`,
  width: 1440,
  height: 900,
  lqip: 'data:image/jpeg;base64,AAAA',
});

describe('Figure', () => {
  it('renders a column figure at the prose measure with its label', () => {
    const html = renderToStaticMarkup(
      <Figure n={2} images={[shot(1)]} caption='The board' layout='column' />
    );
    expect(html).toContain('id="fig-02"');
    expect(html).toContain('data-layout="column"');
    expect(html).toContain('max-w-[62ch]');
    expect(html).toContain('Fig. 02');
    expect(html).toContain('The board');
    expect(html).toContain('loading="lazy"');
    expect(html).not.toContain('grid-cols-2');
  });

  it('renders a wide figure without the prose cap', () => {
    const html = renderToStaticMarkup(
      <Figure n={3} images={[shot(1)]} layout='wide' />
    );
    expect(html).toContain('data-layout="wide"');
    expect(html).not.toContain('max-w-[62ch]');
    expect(html).toContain('sizes="(min-width: 1024px) 832px, 100vw"');
  });

  it('renders a pair side by side with half-width sizes', () => {
    const html = renderToStaticMarkup(
      <Figure n={4} images={[shot(1), shot(2)]} layout='column' />
    );
    expect(html).toContain('grid-cols-2');
    expect(html.match(/<img /g)).toHaveLength(2);
    expect(html).toContain('alt="Shot 2"');
    expect(html).toContain('sizes="(min-width: 768px) 320px, 50vw"');
  });

  it('renders nothing when no image has a url', () => {
    const html = renderToStaticMarkup(
      <Figure n={1} images={[{ ...shot(1), url: null }]} layout='column' />
    );
    expect(html).toBe('');
  });
});

describe('Plate', () => {
  const phoneShot = (n: number) => ({ ...shot(n), width: 1170, height: 2532 });
  const render = (images: Parameters<typeof Plate>[0]['images']) =>
    renderToStaticMarkup(<Plate images={images} fallbackAlt='Zim screenshot' />);
  const rows = (html: string) =>
    html.match(/class="contents md:flex md:gap-2"/g) ?? [];

  it('renders a single image as one full-width tile, preloaded, with no label', () => {
    const html = render([shot(1)]);
    expect(html).toContain('id="plate"');
    expect(html).toContain('data-layout="single"');
    expect(html).not.toContain('<figcaption');
    expect(html).not.toContain('Plate');
    expect(html).toContain('pt-12');
    expect(html).toContain('border border-rule bg-paper-sunken p-2');
    expect(html).toContain('grid grid-cols-1');
    expect(html).toContain('data-preload="true"');
    expect(html).toContain('loading="eager"');
    expect(html).toContain('sizes="(min-width: 1152px) 1072px, 100vw"');
    expect(html.match(/<img /g)).toHaveLength(1);
    expect(rows(html)).toHaveLength(1);
  });

  it('composes four images into two proportional rows', () => {
    const html = render([shot(1), phoneShot(2), shot(3), shot(4)]);
    expect(html).toContain('data-layout="composed"');
    expect(rows(html)).toHaveLength(2);
    expect(html.match(/<img /g)).toHaveLength(4);
    // Tiles grow by their aspect ratio and hold it, so nothing is cropped.
    expect(html).toContain('flex:1.6 1 0;aspect-ratio:1.6');
    expect(html).toContain('flex:0.4621 1 0;aspect-ratio:0.4621');
    expect(html).toContain('min-w-0');
    // Only the first tile is eager.
    expect(html.match(/data-preload="true"/g)).toHaveLength(1);
    expect(html.match(/loading="lazy"/g)).toHaveLength(3);
    expect(html).toContain('alt="Shot 2"');
  });

  it('carries the phone layout for a composed plate', () => {
    const html = render([shot(1), phoneShot(2), shot(3), shot(4)]);
    expect(html).toContain('grid grid-cols-2 gap-2 md:flex md:flex-col');
    expect(html).toMatch(/data-role="main" class="[^"]*max-md:col-span-2/);
    expect(html).toMatch(
      /data-role="companion" class="[^"]*max-md:row-span-2/
    );
    expect(html.match(/max-md:aspect-auto!/g)).toHaveLength(2);
  });

  it('does not span the companion over a single detail', () => {
    const html = render([shot(1), phoneShot(2), shot(3)]);
    expect(rows(html)).toHaveLength(2);
    expect(html).not.toContain('max-md:row-span-2');
    expect(html.match(/max-md:aspect-auto!/g)).toHaveLength(1);
  });

  it('lays all-portrait shots in one row and a two-column phone grid', () => {
    const html = render([phoneShot(1), phoneShot(2), phoneShot(3), phoneShot(4)]);
    expect(html).toContain('data-layout="portrait"');
    expect(rows(html)).toHaveLength(1);
    expect(html).toContain('grid grid-cols-2');
    expect(html).not.toContain('max-md:');
  });

  it('stacks two mixed images on phones', () => {
    const html = render([shot(1), phoneShot(2)]);
    expect(html).toContain('data-layout="stack"');
    expect(html).toContain('grid grid-cols-1');
    expect(rows(html)).toHaveLength(1);
  });

  it('falls back to the given alt and renders nothing without an image', () => {
    expect(render([{ ...shot(1), alt: null }])).toContain(
      'alt="Zim screenshot"'
    );
    expect(render([])).toBe('');
    expect(render([{ ...shot(1), width: null }])).toBe('');
  });
});

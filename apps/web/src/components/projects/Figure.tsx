import Image from 'next/image';
import {
  FALLBACK_DIMENSIONS,
  type FigureImageData,
  type FigureLayout,
  figureClasses,
  figureId,
  figureLabel,
  figureSizes,
} from './figures';

type FrameImageProps = {
  image: FigureImageData & { url: string };
  alt: string;
  sizes: string;
  priority?: boolean;
  /** Defaults to a full-width block at the image's own height. */
  className?: string;
};

/** One screenshot at its real intrinsic size, with the asset's LQIP as blur. */
export function FrameImage({
  image,
  alt,
  sizes,
  priority,
  className = 'block h-auto w-full',
}: FrameImageProps) {
  return (
    <Image
      src={image.url}
      alt={alt}
      width={image.width ?? FALLBACK_DIMENSIONS.width}
      height={image.height ?? FALLBACK_DIMENSIONS.height}
      sizes={sizes}
      preload={priority}
      loading={priority ? 'eager' : 'lazy'}
      placeholder={image.lqip ? 'blur' : 'empty'}
      blurDataURL={image.lqip ?? undefined}
      className={className}
    />
  );
}

type CaptionBarProps = {
  label: string;
  caption?: string | null;
};

/**
 * The mono caption strip under a figure. Same language as a code listing's
 * filename bar: raised paper, hairline rule, uppercase label.
 */
export function CaptionBar({ label, caption }: CaptionBarProps) {
  return (
    <figcaption className='flex min-w-0 items-baseline gap-4 border border-t-0 border-rule bg-paper-raised px-4 py-2.5'>
      <span className='shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-mark'>
        {label}
      </span>
      {caption && (
        <span className='min-w-0 font-mono text-[0.75rem] leading-relaxed text-ink-soft'>
          {caption}
        </span>
      )}
    </figcaption>
  );
}

export type FigureProps = {
  n: number;
  images: FigureImageData[];
  caption?: string | null;
  layout: FigureLayout;
};

/**
 * A numbered body figure: one screenshot or a side-by-side pair, recessed on
 * the sunken surface like a code listing, with a "Fig. NN" caption strip.
 */
export default function Figure({ n, images, caption, layout }: FigureProps) {
  const shown = images
    .filter((image): image is FigureImageData & { url: string } =>
      Boolean(image.url)
    )
    .slice(0, 2);
  if (!shown.length) return null;

  const label = figureLabel(n);
  const classes = figureClasses(layout, shown.length);
  const sizes = figureSizes(layout, shown.length);

  return (
    <figure
      id={figureId(n)}
      data-layout={layout}
      className={`my-10 min-w-0 scroll-m-16 ${classes.figure}`}
    >
      <div
        className={`border border-rule bg-paper-sunken p-2 sm:p-3 ${classes.frame}`}
      >
        {shown.map((image, index) => (
          <FrameImage
            key={image._key ?? index}
            image={image}
            alt={image.alt || `${label}${shown.length > 1 ? `, ${index + 1}` : ''}`}
            sizes={sizes}
          />
        ))}
      </div>
      <CaptionBar label={label} caption={caption} />
    </figure>
  );
}

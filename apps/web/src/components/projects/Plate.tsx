import type { CSSProperties } from 'react';
import { FrameImage } from './Figure';
import {
  type FigureImageData,
  type PlateLayout,
  type PlateTile,
  planPlate,
} from './figures';

type PlateSourceImage = FigureImageData;

type Props = {
  /** The project's gallery; the first four usable images make the plate. */
  images: readonly PlateSourceImage[] | null | undefined;
  /** Alt text for a gallery image without its own, e.g. "<title> screenshot". */
  fallbackAlt: string;
};

/*
 * Below md the rows dissolve (`contents`) and the tiles become items of the
 * frame's grid; from md up the frame is a column of flex rows. Flex values
 * only act inside those rows, so the per-tile `flex` style is inert on phones.
 */
const FRAME_CLASS: Record<PlateLayout, string> = {
  single: 'grid grid-cols-1 gap-2 md:flex md:flex-col',
  stack: 'grid grid-cols-1 gap-2 md:flex md:flex-col',
  portrait: 'grid grid-cols-2 gap-2 md:flex md:flex-col',
  composed: 'grid grid-cols-2 gap-2 md:flex md:flex-col',
};

const ROW_CLASS = 'contents md:flex md:gap-2';

/**
 * Phone placement for the composed layout: the main screen spans both
 * columns; the companion spans the details' rows, so its own aspect ratio
 * sets their height and the details (aspect released) cover-fill beside it.
 */
const tileClass = (
  layout: PlateLayout,
  tile: PlateTile<PlateSourceImage>,
  details: number
): string => {
  const classes = ['relative min-w-0 overflow-hidden bg-paper-raised'];
  if (layout === 'composed') {
    if (tile.role === 'main') classes.push('max-md:col-span-2');
    if (tile.role === 'companion' && details > 1) {
      classes.push('max-md:row-span-2');
    }
    if (tile.role === 'detail') classes.push('max-md:aspect-auto!');
  }
  return classes.join(' ');
};

const tileStyle = (ratio: number): CSSProperties => {
  const r = Number(ratio.toFixed(4));
  return { flex: `${r} 1 0`, aspectRatio: r };
};

/**
 * The case study's hero plate: a composed showcase of the gallery's first
 * screens under the case header. It carries no label or caption (the header
 * above it already names the project; each tile has its own alt). Layout
 * rules live in `planPlate`; this only renders the plan. The first tile is
 * priority-loaded because it sits near the fold. Renders nothing without a
 * usable image.
 */
export default function Plate({ images, fallbackAlt }: Props) {
  const plan = planPlate(images);
  if (!plan) return null;

  const details = plan.tiles.filter((tile) => tile.role === 'detail').length;

  return (
    <figure
      id='plate'
      data-layout={plan.layout}
      className='min-w-0 scroll-m-16 pt-12'
    >
      <div
        className={`border border-rule bg-paper-sunken p-2 ${FRAME_CLASS[plan.layout]}`}
      >
        {plan.rows.map((row, r) => (
          <div key={r} className={ROW_CLASS}>
            {row.map((tile) => (
              <div
                key={tile.image._key ?? tile.index}
                data-role={tile.role}
                className={tileClass(plan.layout, tile, details)}
                style={tileStyle(tile.ratio)}
              >
                <FrameImage
                  image={tile.image}
                  alt={tile.image.alt || fallbackAlt}
                  sizes={tile.sizes}
                  priority={tile.index === 0}
                  className='absolute inset-0 h-full w-full object-cover object-top'
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </figure>
  );
}

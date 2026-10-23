/**
 * Pure helpers shared by the case-study plate and body figures: numbering,
 * labels, layout classes and responsive `sizes`. Kept free of React so the
 * rules are unit-testable on their own.
 */

export type FigureLayout = 'column' | 'wide';

/** The image fields both the hero plate and body figures project from GROQ. */
export type FigureImageData = {
  _key?: string;
  alt?: string | null;
  url: string | null;
  width: number | null;
  height: number | null;
  lqip: string | null;
};

/** Intrinsic size used only if an asset somehow lacks metadata dimensions. */
export const FALLBACK_DIMENSIONS = { width: 1600, height: 1000 } as const;

/**
 * The hero plate's main screen: the first gallery image the plate can show
 * (see `planPlate`). The page uses it to decide whether "Plate 01" exists,
 * so body figure numbering always agrees with what the plate renders.
 */
export const heroPlateImage = <T extends PlateSource>(
  images: readonly T[] | null | undefined
): PlateImage<T> | null => planPlate(images)?.tiles[0]?.image ?? null;

/** "Plate 01" takes the first number, so body figures continue from 02. */
export const firstFigureNumber = (hasPlate: boolean): number =>
  hasPlate ? 2 : 1;

/**
 * Number every `figure` block in reading order, starting at `start`. Other
 * block types (including legacy bare images) never consume a number.
 */
export const figureNumbers = (
  content: ReadonlyArray<{ _type: string; _key: string }>,
  start = 1
): Map<string, number> => {
  const numbers = new Map<string, number>();
  let next = start;
  content.forEach((block) => {
    if (block._type === 'figure') numbers.set(block._key, next++);
  });
  return numbers;
};

/** Two-digit plate/figure label, e.g. `Fig. 02` or `Plate 01`. */
export const figureLabel = (kind: 'figure' | 'plate', n: number): string =>
  `${kind === 'plate' ? 'Plate' : 'Fig.'} ${String(n).padStart(2, '0')}`;

/** Anchor id for a numbered figure or plate, e.g. `fig-02`, `plate-01`. */
export const figureId = (kind: 'figure' | 'plate', n: number): string =>
  `${kind === 'plate' ? 'plate' : 'fig'}-${String(n).padStart(2, '0')}`;

export const normalizeLayout = (
  layout: string | null | undefined
): FigureLayout => (layout === 'wide' ? 'wide' : 'column');

/**
 * Width classes for the figure and its image frame. `column` holds the 62ch
 * prose measure; `wide` spans the article column like a code listing. A pair
 * sits side by side at every width (phone shots stay legible at half width).
 */
export const figureClasses = (layout: FigureLayout, count: number) => ({
  figure: layout === 'wide' ? 'w-full' : 'w-full max-w-[62ch]',
  frame:
    count > 1
      ? 'grid grid-cols-2 items-start gap-2 sm:gap-3'
      : 'block',
});

/*
 * Rendered widths, from the page grid: max-w-6xl (72rem) minus md:px-10 is a
 * 67rem (1072px) container; the article column subtracts the 11rem rail and
 * 4rem gap at lg (52rem, 832px). 62ch of 17px Plex Sans is about 640px.
 */
const ARTICLE_PX = 832;
const COLUMN_PX = 640;
const CONTAINER_PX = 1072;

/** `sizes` for a body figure, halved per image when it is a pair. */
export const figureSizes = (layout: FigureLayout, count: number): string => {
  const pair = count > 1;
  if (layout === 'wide') {
    return pair
      ? `(min-width: 1024px) ${ARTICLE_PX / 2}px, 50vw`
      : `(min-width: 1024px) ${ARTICLE_PX}px, 100vw`;
  }
  return pair
    ? `(min-width: 768px) ${COLUMN_PX / 2}px, 50vw`
    : `(min-width: 768px) ${COLUMN_PX}px, 100vw`;
};

/** The gallery fields the plate reads; anything else (alt, lqip) rides along. */
export type PlateSource = {
  url: string | null;
  width: number | null;
  height: number | null;
  caption?: string | null;
};

/** A gallery image the plate can lay out: it has a URL and real dimensions. */
export type PlateImage<T> = T & { url: string; width: number; height: number };

export type PlateRole = 'main' | 'companion' | 'detail';

/**
 * How the plate is arranged, which also picks its phone layout:
 * - `single`: one image, full width at every size.
 * - `stack`: two images, not both portrait. One row on desktop; stacked
 *   full width on phones.
 * - `portrait`: two to four images, all portrait. One row on desktop; a
 *   two-column grid on phones.
 * - `composed`: three or four images with any landscape among them. Row one
 *   is the main screen and the companion, row two the details. On phones the
 *   main screen goes full width, then the companion sits beside the details
 *   stacked in a column of the companion's height.
 */
export type PlateLayout = 'single' | 'stack' | 'portrait' | 'composed';

export type PlateTile<T> = {
  image: PlateImage<T>;
  role: PlateRole;
  /** width / height; sizes the tile within its row and sets its aspect. */
  ratio: number;
  /** Position in reading order. Tile 0 is the priority-loaded one. */
  index: number;
  /** Responsive `sizes`, from the tile's share of the plate's width. */
  sizes: string;
};

export type PlatePlan<T> = {
  layout: PlateLayout;
  /** Desktop rows, top to bottom. */
  rows: PlateTile<T>[][];
  /** Every tile in reading order (the rows, flattened). */
  tiles: PlateTile<T>[];
  /** The first non-empty caption among the shown images. */
  caption: string | null;
};

/** The plate shows at most this many gallery images. */
export const PLATE_MAX_IMAGES = 4;

const MD_PX = 768;
const PLATE_WIDE_PX = 1152;

const isPlateImage = <T extends PlateSource>(
  image: T | null | undefined
): image is PlateImage<T> =>
  Boolean(image?.url) &&
  typeof image?.width === 'number' &&
  image.width > 0 &&
  typeof image?.height === 'number' &&
  image.height > 0;

/**
 * `sizes` for a plate tile. `share` is its fraction of the container on
 * desktop rows (gaps ignored); `phoneVw` its width below md.
 */
const plateSizes = (share: number, phoneVw: number): string => {
  const px = Math.round(CONTAINER_PX * share);
  const vw = Math.round(share * 100);
  if (vw === 100 && phoneVw === 100) {
    return `(min-width: ${PLATE_WIDE_PX}px) ${px}px, 100vw`;
  }
  return `(min-width: ${PLATE_WIDE_PX}px) ${px}px, (min-width: ${MD_PX}px) ${vw}vw, ${phoneVw}vw`;
};

const ROLES: readonly PlateRole[] = ['main', 'companion', 'detail', 'detail'];

/**
 * Compose the hero plate from the project's gallery. Pure, so the layout
 * rules are unit-testable apart from the markup:
 *
 * 1. Up to the first four images with a URL, width and height; others are
 *    skipped. Order sets the role: main screen, companion, then details.
 * 2. Every image portrait (two or more): one row of all of them. Otherwise
 *    row one is the main screen and the companion, row two the details
 *    (omitted when there are none; one detail spans the row).
 * 3. Within a row each tile's width is proportional to its aspect ratio, so
 *    the row shares one height and nothing gets cropped.
 *
 * Returns null when no image is usable.
 */
export const planPlate = <T extends PlateSource>(
  images: readonly T[] | null | undefined
): PlatePlan<T> | null => {
  const shown = (images ?? [])
    .filter(isPlateImage)
    .slice(0, PLATE_MAX_IMAGES);
  if (!shown.length) return null;

  const allPortrait =
    shown.length > 1 && shown.every((image) => image.height > image.width);
  const layout: PlateLayout =
    shown.length === 1
      ? 'single'
      : allPortrait
        ? 'portrait'
        : shown.length === 2
          ? 'stack'
          : 'composed';

  const groups = allPortrait ? [shown] : [shown.slice(0, 2), shown.slice(2)];

  // Phone width per role: the composed layout keeps the main screen full
  // width and halves the rest; the portrait grid halves everything.
  const phoneVw = (role: PlateRole): number => {
    if (layout === 'portrait') return 50;
    if (layout === 'composed') return role === 'main' ? 100 : 50;
    return 100;
  };

  let index = 0;
  const rows = groups
    .filter((group) => group.length > 0)
    .map((group) => {
      const ratios = group.map((image) => image.width / image.height);
      const total = ratios.reduce((sum, ratio) => sum + ratio, 0);
      return group.map((image, i): PlateTile<T> => {
        const role = ROLES[index];
        const tile = {
          image,
          role,
          ratio: ratios[i],
          index,
          sizes: plateSizes(ratios[i] / total, phoneVw(role)),
        };
        index += 1;
        return tile;
      });
    });

  const caption =
    shown.map((image) => image.caption?.trim()).find(Boolean) ?? null;

  return { layout, rows, tiles: rows.flat(), caption };
};

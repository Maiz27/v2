import { describe, expect, it } from 'vitest';
import {
  figureClasses,
  figureId,
  figureLabel,
  figureNumbers,
  figureSizes,
  normalizeLayout,
  planPlate,
} from './figures';

const block = (_type: string, _key: string) => ({ _type, _key });

describe('figureNumbers', () => {
  const content = [
    block('block', 'p1'),
    block('figure', 'f1'),
    block('snippet', 's1'),
    block('image', 'legacy'),
    block('figure', 'f2'),
    block('figure', 'f3'),
  ];

  it('numbers only figure blocks, in reading order, from 1', () => {
    const numbers = figureNumbers(content);
    expect([...numbers]).toEqual([
      ['f1', 1],
      ['f2', 2],
      ['f3', 3],
    ]);
    expect(numbers.has('legacy')).toBe(false);
  });

  it('returns an empty map when there are no figures', () => {
    expect(figureNumbers([block('block', 'p1')]).size).toBe(0);
  });
});

/** A gallery image of the given intrinsic size. */
const img = (
  n: number,
  width: number | null = 1440,
  height: number | null = 900,
  extra: { url?: string | null } = {}
) => ({
  _key: `k${n}`,
  alt: `Shot ${n}`,
  url: `https://cdn.sanity.io/${n}.png`,
  width,
  height,
  lqip: null,
  ...extra,
});
const landscape = (n: number) => img(n, 1440, 900); // 1.6
const phone = (n: number) => img(n, 1170, 2532); // ~0.4621
const keys = (rows: { image: { _key: string } }[][]) =>
  rows.map((row) => row.map((tile) => tile.image._key));

describe('planPlate', () => {
  it('returns null without a usable image', () => {
    expect(planPlate(null)).toBeNull();
    expect(planPlate([])).toBeNull();
    expect(planPlate([img(1, null, 900), img(2, 1440, 0)])).toBeNull();
  });

  it('plans one image as a single full-width tile', () => {
    const plan = planPlate([landscape(1)]);
    expect(plan?.layout).toBe('single');
    expect(keys(plan!.rows)).toEqual([['k1']]);
    expect(plan!.tiles[0]).toMatchObject({ role: 'main', ratio: 1.6, index: 0 });
    expect(plan!.tiles[0].sizes).toBe('(min-width: 1152px) 1072px, 100vw');
  });

  it('plans two images as one row that stacks on phones', () => {
    const plan = planPlate([landscape(1), phone(2)])!;
    expect(plan.layout).toBe('stack');
    expect(keys(plan.rows)).toEqual([['k1', 'k2']]);
    expect(plan.tiles.map((t) => t.role)).toEqual(['main', 'companion']);
    // Shares follow the aspect ratios: 1.6 vs 0.4621 of 2.0621.
    expect(plan.tiles[0].sizes).toBe(
      '(min-width: 1152px) 832px, (min-width: 768px) 78vw, 100vw'
    );
    expect(plan.tiles[1].sizes).toBe(
      '(min-width: 1152px) 240px, (min-width: 768px) 22vw, 100vw'
    );
  });

  it('puts a lone third image full width on row two', () => {
    const plan = planPlate([landscape(1), phone(2), landscape(3)])!;
    expect(plan.layout).toBe('composed');
    expect(keys(plan.rows)).toEqual([['k1', 'k2'], ['k3']]);
    expect(plan.tiles.map((t) => t.role)).toEqual([
      'main',
      'companion',
      'detail',
    ]);
    expect(plan.tiles[2].sizes).toBe(
      '(min-width: 1152px) 1072px, (min-width: 768px) 100vw, 50vw'
    );
  });

  it('composes four images as main + companion over two details', () => {
    const plan = planPlate([
      landscape(1),
      phone(2),
      img(3, 1250, 1020),
      landscape(4),
    ])!;
    expect(plan.layout).toBe('composed');
    expect(keys(plan.rows)).toEqual([
      ['k1', 'k2'],
      ['k3', 'k4'],
    ]);
    expect(plan.tiles.map((t) => [t.role, t.index])).toEqual([
      ['main', 0],
      ['companion', 1],
      ['detail', 2],
      ['detail', 3],
    ]);
    // Phones: the main screen stays full width, the rest go half.
    expect(plan.tiles[0].sizes).toMatch(/, 100vw$/);
    expect(plan.tiles[1].sizes).toMatch(/, 50vw$/);
    expect(plan.tiles[3].sizes).toMatch(/, 50vw$/);
  });

  it('keeps the two-row composition when the companion is landscape', () => {
    const plan = planPlate([
      landscape(1),
      landscape(2),
      phone(3),
      landscape(4),
    ])!;
    expect(plan.layout).toBe('composed');
    expect(keys(plan.rows)).toEqual([
      ['k1', 'k2'],
      ['k3', 'k4'],
    ]);
    expect(plan.tiles[1].role).toBe('companion');
    expect(plan.tiles[1].sizes).toBe(
      '(min-width: 1152px) 536px, (min-width: 768px) 50vw, 50vw'
    );
  });

  it('lays four portrait images in one row, a 2-up grid on phones', () => {
    const plan = planPlate([phone(1), phone(2), phone(3), phone(4)])!;
    expect(plan.layout).toBe('portrait');
    expect(keys(plan.rows)).toEqual([['k1', 'k2', 'k3', 'k4']]);
    expect(plan.tiles[0].sizes).toBe(
      '(min-width: 1152px) 268px, (min-width: 768px) 25vw, 50vw'
    );
  });

  it('lays two portrait images side by side at every width', () => {
    const plan = planPlate([phone(1), phone(2)])!;
    expect(plan.layout).toBe('portrait');
    expect(keys(plan.rows)).toEqual([['k1', 'k2']]);
    expect(plan.tiles[1].sizes).toMatch(/, 50vw$/);
  });

  it('drops images missing a url or dimensions before assigning roles', () => {
    const plan = planPlate([
      img(1, null, null),
      landscape(2),
      img(3, 1440, 900, { url: null }),
      phone(4),
    ])!;
    expect(plan.layout).toBe('stack');
    expect(keys(plan.rows)).toEqual([['k2', 'k4']]);
    expect(plan.tiles[0].role).toBe('main');
  });

  it('ignores a fifth image', () => {
    const plan = planPlate([
      landscape(1),
      phone(2),
      landscape(3),
      landscape(4),
      landscape(5),
    ])!;
    expect(plan.tiles).toHaveLength(4);
    expect(plan.tiles.map((t) => t.image._key)).not.toContain('k5');
  });

});

describe('labels and ids', () => {
  it('pads to two digits', () => {
    expect(figureLabel(2)).toBe('Fig. 02');
    expect(figureLabel(12)).toBe('Fig. 12');
    expect(figureId(1)).toBe('fig-01');
    expect(figureId(3)).toBe('fig-03');
  });
});

describe('normalizeLayout', () => {
  it('defaults anything but wide to column', () => {
    expect(normalizeLayout('wide')).toBe('wide');
    expect(normalizeLayout('column')).toBe('column');
    expect(normalizeLayout(null)).toBe('column');
    expect(normalizeLayout(undefined)).toBe('column');
    expect(normalizeLayout('bogus')).toBe('column');
  });
});

describe('figureClasses', () => {
  it('caps the column layout at the prose measure', () => {
    expect(figureClasses('column', 1).figure).toContain('max-w-[62ch]');
    expect(figureClasses('wide', 1).figure).not.toContain('max-w-');
  });

  it('lays a pair out side by side', () => {
    expect(figureClasses('column', 2).frame).toContain('grid-cols-2');
    expect(figureClasses('wide', 1).frame).not.toContain('grid');
  });
});

describe('figureSizes', () => {
  it('halves the slot for a pair', () => {
    expect(figureSizes('wide', 1)).toBe('(min-width: 1024px) 832px, 100vw');
    expect(figureSizes('wide', 2)).toBe('(min-width: 1024px) 416px, 50vw');
    expect(figureSizes('column', 1)).toBe('(min-width: 768px) 640px, 100vw');
    expect(figureSizes('column', 2)).toBe('(min-width: 768px) 320px, 50vw');
  });
});

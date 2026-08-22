import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/data/cv', () => ({ cv: { get: vi.fn() } }));

import {
  bareUrl,
  formatDates,
  formatMonthYear,
  mapExperience,
  mapProject,
} from './data';

describe('CV date and URL helpers', () => {
  it('formats date-only values in UTC', () => {
    expect(formatMonthYear('2022-10-01')).toBe('October 2022');
  });

  it('formats completed, current, and missing date ranges', () => {
    expect(formatDates({ from: '2024-01-01', to: '2026-06-01' })).toBe(
      'January 2024 to June 2026'
    );
    expect(formatDates({ from: '2022-10-01' })).toBe(
      'October 2022 to Present'
    );
    expect(formatDates(undefined)).toBe('');
  });

  it('removes HTTP protocols and one trailing slash', () => {
    expect(bareUrl('https://example.com/work/')).toBe('example.com/work');
    expect(bareUrl('http://example.com')).toBe('example.com');
  });
});

describe('CV mappers', () => {
  it('maps a Sanity experience projection into display data', () => {
    expect(
      mapExperience({
        title: 'Senior Engineer',
        location: 'Remote',
        duration: {
          _type: 'duration',
          from: '2022-10-01',
          to: '2025-03-01',
        },
        company: {
          name: 'Example Co',
          label: 'Studio',
          href: 'https://example.com',
        },
        tools: [{ name: 'TypeScript' }, { name: 'Next.js' }],
        cvBullets: ['Shipped the product.', 'Led the migration.'],
      })
    ).toEqual({
      title: 'Senior Engineer',
      org: 'Example Co',
      orgHref: 'https://example.com',
      orgLabel: 'Studio',
      place: 'Remote',
      dates: 'October 2022 to March 2025',
      bullets: ['Shipped the product.', 'Led the migration.'],
      tech: 'TypeScript / Next.js',
    });
  });

  it('maps project links, stack, date, and status', () => {
    expect(
      mapProject({
        title: 'Project One',
        tools: [{ name: 'Flutter' }, { name: 'Dart' }],
        date: '2026-02-01',
        status: 'ongoing',
        href: 'https://project.example/',
        source: 'https://github.com/example/project',
        cvBlurb: 'A representative project.',
      })
    ).toEqual({
      name: 'Project One',
      meta: 'Flutter / Dart / 2026, ongoing',
      dateLabel: '2026, ongoing',
      stack: 'Flutter / Dart',
      href: 'https://project.example/',
      hrefLabel: 'project.example',
      blurb: 'A representative project.',
    });
  });

  it('uses source as a fallback and tolerates missing dates and URLs', () => {
    expect(
      mapProject({
        title: 'Source only',
        tools: [],
        date: '',
        status: 'completed',
        href: null,
        source: 'https://github.com/example/source/',
        cvBlurb: null,
      })
    ).toEqual({
      name: 'Source only',
      meta: '',
      dateLabel: '',
      stack: '',
      href: 'https://github.com/example/source/',
      hrefLabel: 'github.com/example/source',
      blurb: '',
    });

    expect(
      mapProject({
        title: 'No link',
        tools: [],
        date: '',
        status: 'completed',
        href: null,
        source: null,
        cvBlurb: null,
      })
    ).toMatchObject({ href: undefined, hrefLabel: '', dateLabel: '' });
  });
});

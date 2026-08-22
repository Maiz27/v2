import { describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));
vi.mock('react', () => ({
  useEffect: vi.fn(),
  useRef: vi.fn(),
  useState: vi.fn(),
}));
vi.mock('react/jsx-runtime', () => ({
  jsx: () => undefined,
  jsxs: () => undefined,
}));

import { destinationForPath } from './RouteTransition';

describe('destinationForPath', () => {
  it.each([
    ['/', { eyebrow: 'Index', label: 'The work' }],
    ['/cv', { eyebrow: 'Curriculum vitae', label: 'Maged Faiz' }],
    ['/projects', { eyebrow: 'Archive', label: 'Every project' }],
    ['/projects/v2', { eyebrow: 'Case study', label: 'The write-up' }],
    ['/contact', { eyebrow: 'Elsewhere', label: 'Loading' }],
  ])('maps %s to its transition copy', (
    pathname: string,
    expected: { eyebrow: string; label: string }
  ) => {
    expect(destinationForPath(pathname)).toEqual(expected);
  });
});

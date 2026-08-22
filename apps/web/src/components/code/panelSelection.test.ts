import { describe, expect, it } from 'vitest';
import type { CodeAnnotation } from '@/lib/annotations';
import {
  selectedIdForPanel,
  toggledPanelSelection,
} from './panelSelection';

const annotations: CodeAnnotation[] = [
  { id: 'shared', kind: 'context', match: 'x', body: 'A note' },
];

describe('panel selection identity', () => {
  it('does not carry a shared annotation id into another panel', () => {
    expect(
      selectedIdForPanel(
        { id: 'shared', panelKey: 'first' },
        'second',
        annotations
      )
    ).toBeNull();
  });

  it('pins a same-named annotation after switching panels', () => {
    expect(
      toggledPanelSelection(
        { id: 'shared', panelKey: 'first' },
        'shared',
        'second',
        annotations
      )
    ).toEqual({ id: 'shared', panelKey: 'second' });
  });
});

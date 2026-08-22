import { describe, expect, it } from 'vitest';

import { tabLabels } from '@/components/code/tabLabels';

describe('tabLabels', () => {
  it('uses filenames when every basename is unique', () => {
    expect(tabLabels(['src/index.ts', 'src/styles.css'])).toEqual([
      'index.ts',
      'styles.css',
    ]);
  });

  it('adds the shortest distinguishing suffix for duplicate filenames', () => {
    expect(
      tabLabels([
        'apps/web/src/index.ts',
        'apps/studio/src/index.ts',
        'apps/web/src/styles.css',
      ])
    ).toEqual(['web/src/index.ts', 'studio/src/index.ts', 'styles.css']);
  });
});

import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { nthIndexOf as applicationNthIndexOf } from '@/lib/annotations';

vi.mock('@sanity/client', () => ({
  createClient: () => ({
    getDocument: async () => null,
  }),
}));

/* scripts/ is intentionally untracked (.gitignore:74), so CI checkouts do not
   contain the authoring verifier. The drift this test guards against can only
   happen on machines that run the authoring scripts, where the file exists,
   so the suite skips itself cleanly everywhere else. */
const SCRIPT_URL = new URL(
  '../../../../../scripts/case-studies/_verify_annotations.mjs',
  import.meta.url
);
const scriptAvailable = existsSync(fileURLToPath(SCRIPT_URL));

let scriptNthIndexOf: typeof applicationNthIndexOf;

describe.skipIf(!scriptAvailable)('annotation verifier parity', () => {
  beforeAll(async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const verificationScript = await import(SCRIPT_URL.href);
    scriptNthIndexOf = verificationScript.nthIndexOf;
    log.mockRestore();
  });

  it.each([
    ['one two one two', 'one', 1, 0],
    ['one two one two', 'one', 2, 8],
    ['one two one two', 'one', 3, -1],
    ['abcdef', 'missing', 1, -1],
    ['aaaa', 'aa', 1, 0],
    ['aaaa', 'aa', 2, 1],
    ['aaaa', 'aa', 3, 2],
    ['aaaa', 'aa', 4, -1],
  ])(
    'matches the script for %j occurrence %i',
    (
      haystack: string,
      needle: string,
      occurrence: number,
      expected: number
    ) => {
      expect(applicationNthIndexOf(haystack, needle, occurrence)).toBe(expected);
      expect(scriptNthIndexOf(haystack, needle, occurrence)).toBe(expected);
    }
  );
});

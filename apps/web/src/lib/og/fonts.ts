import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * The three faces the Open Graph cards are set in, as static fonts (Satori
 * reads TTF/OTF/WOFF but not WOFF2, and renders only the default instance of a
 * variable font, so the variable files next/font uses would come out as
 * Regular). All OFL-1.1; the license texts sit next to the files.
 *
 * - STIXTwoText-Bold-latin.woff: @fontsource/stix-two-text@5.2.8
 *   files/stix-two-text-latin-700-normal.woff (Google Fonts' static 700
 *   instance, Latin subset). google/fonts only ships STIX Two Text as a
 *   variable font, and the upstream static TTF/OTF from stipub/stixfonts
 *   crash Satori's opentype parser ("lookupType: 7 - substFormat: 1 is not
 *   yet supported", a GSUB extension lookup).
 * - IBMPlexSans-Regular.ttf: IBM/plex packages/plex-sans/fonts/complete/ttf
 *   (google/fonts only ships Plex Sans as a variable font).
 * - IBMPlexMono-Regular.ttf: google/fonts ofl/ibmplexmono.
 */
const FONT_FILES = {
  display: 'STIXTwoText-Bold-latin.woff',
  body: 'IBMPlexSans-Regular.ttf',
  mono: 'IBMPlexMono-Regular.ttf',
} as const;

// process.cwd() is the Next project directory (apps/web) both under
// `next start` and in the traced Vercel function, and Next's output file
// tracing follows a `join(process.cwd(), '<literal>')` read, so these files
// ship with the OG routes. This is the pattern the Next 16 opengraph-image
// docs give for the Node.js runtime; `fetch(new URL(..., import.meta.url))`
// is the Edge-runtime equivalent and Node's fetch rejects file: URLs.
const fontPath = (file: string) =>
  join(process.cwd(), 'src/lib/og/fonts', file);

type OgFont = {
  name: string;
  data: Buffer;
  weight: 400 | 700;
  style: 'normal';
};

let cached: Promise<OgFont[]> | null = null;

/** Font buffers for ImageResponse, read once per server instance. */
export const loadOgFonts = (): Promise<OgFont[]> => {
  cached ??= Promise.all([
    readFile(fontPath(FONT_FILES.display)),
    readFile(fontPath(FONT_FILES.body)),
    readFile(fontPath(FONT_FILES.mono)),
  ])
    .then(([display, body, mono]): OgFont[] => [
      { name: 'STIX Two Text', data: display, weight: 700, style: 'normal' },
      { name: 'IBM Plex Sans', data: body, weight: 400, style: 'normal' },
      { name: 'IBM Plex Mono', data: mono, weight: 400, style: 'normal' },
    ])
    .catch((error) => {
      // Don't memoize a failed read; the next request retries.
      cached = null;
      throw error;
    });
  return cached;
};

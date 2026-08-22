import { codeToHtml } from 'shiki';
import {
  resolveAnnotations,
  type CodeAnnotation,
  type ResolvedAnnotations,
} from './annotations';

/**
 * The listing theme: Nord's desaturated arctic palette sits naturally on the
 * Negative theme's graphite + ice-blue tokens without turning listings neon.
 * The background is overridden to the paper-sunken token in globals.css.
 */
export const LEDGER_SHIKI_THEME = 'nord';

/**
 * Three Nord tokens fall below WCAG AA on our surfaces (comments 3.92:1 on the
 * sunken listing background; comments/errors/meta drop to 2.8-3.7:1 under the
 * annotation highlight washes). These lightened stand-ins clear 4.6:1 on the
 * sunken background AND both wash colors while keeping Nord's hue.
 */
const CONTRAST_REPLACEMENTS = {
  '#616e88': '#8992a6', // comments
  '#bf616a': '#ca7c83', // errors / regex
  '#5e81ac': '#7694b8', // meta / punctuation accents
};

/** Highlight a snippet with Shiki, no annotations. */
export async function highlight(code: string, lang: string): Promise<string> {
  return codeToHtml(code, {
    lang: lang || 'typescript',
    theme: LEDGER_SHIKI_THEME,
    colorReplacements: CONTRAST_REPLACEMENTS,
  });
}

/**
 * Highlight a snippet and wrap each resolved annotation range in a
 * `<span data-annot data-kind data-n>` via Shiki decorations, so the listing
 * can attach hover/popover behavior client-side.
 *
 * Annotation resolution is delegated to `resolveAnnotations`, which never
 * throws: a bad authored annotation (wrong `match`/`occurrence`) is skipped and
 * surfaced via `misses` instead of crashing the page. Misses are `console.warn`ed
 * outside production so they're visible in dev/server logs, and returned to the
 * caller alongside the html.
 */
export async function highlightAnnotated(
  code: string,
  lang: string,
  annotations: CodeAnnotation[]
): Promise<{ html: string; misses: ResolvedAnnotations['misses'] }> {
  const { ranges, misses } = resolveAnnotations(code, annotations);

  if (misses.length > 0 && process.env.NODE_ENV !== 'production') {
    console.warn(
      `highlightAnnotated: ${misses.length} annotation(s) did not match the code and were skipped:`,
      misses
    );
  }

  const html = await codeToHtml(code, {
    lang: lang || 'typescript',
    theme: LEDGER_SHIKI_THEME,
    colorReplacements: CONTRAST_REPLACEMENTS,
    decorations: ranges,
  });

  return { html, misses };
}

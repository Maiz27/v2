import { codeToHtml } from 'shiki';
import {
  resolveAnnotations,
  type CodeAnnotation,
  type ResolvedAnnotations,
} from './annotations';

/** The Ledger listing theme: a light editorial palette on the paper surface. */
export const LEDGER_SHIKI_THEME = 'vitesse-light';

/** Highlight a snippet with Shiki, no annotations. */
export async function highlight(code: string, lang: string): Promise<string> {
  return codeToHtml(code, {
    lang: lang || 'typescript',
    theme: LEDGER_SHIKI_THEME,
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
    decorations: ranges,
  });

  return { html, misses };
}

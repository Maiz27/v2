import { codeToHtml, type DecorationItem } from 'shiki';
import type { CodeAnnotation } from './annotations';

/** The Ledger listing theme: a light editorial palette on the paper surface. */
export const LEDGER_SHIKI_THEME = 'vitesse-light';

function nthIndexOf(haystack: string, needle: string, n: number): number {
  let index = -1;
  for (let i = 0; i < n; i++) {
    index = haystack.indexOf(needle, index + 1);
    if (index === -1) return -1;
  }
  return index;
}

/** Highlight a snippet with Shiki, no annotations. */
export async function highlight(code: string, lang: string): Promise<string> {
  return codeToHtml(code, {
    lang: lang || 'typescript',
    theme: LEDGER_SHIKI_THEME,
  });
}

/**
 * Highlight a snippet and wrap each annotated range in a
 * `<span data-annot data-kind data-n>` via Shiki decorations, so the listing
 * can attach hover/popover behavior client-side.
 */
export async function highlightAnnotated(
  code: string,
  lang: string,
  annotations: CodeAnnotation[]
): Promise<string> {
  const decorations: DecorationItem[] = annotations.map((a, i) => {
    const start = nthIndexOf(code, a.match, a.occurrence ?? 1);
    if (start === -1) {
      throw new Error(
        `Annotation "${a.id}" match not found in code: ${a.match}`
      );
    }
    return {
      start,
      end: start + a.match.length,
      properties: {
        class: `annot annot-${a.kind}`,
        'data-annot': a.id,
        'data-kind': a.kind,
        'data-n': String(i + 1),
        tabindex: 0,
      },
    };
  });

  return codeToHtml(code, {
    lang: lang || 'typescript',
    theme: LEDGER_SHIKI_THEME,
    decorations,
  });
}

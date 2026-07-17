/**
 * Interactive code annotations: the V3 centerpiece. Every case study now
 * carries authored annotations, rendering the hybrid margin-notes / popover
 * listing; plain rendering remains the fallback for a snippet with none.
 *
 * "decision" notes read in red (why this, what I rejected); "context" notes in
 * grey (what it does).
 */
import type { DecorationItem } from 'shiki';

export type AnnotationKind = 'decision' | 'context';

export type CodeAnnotation = {
  id: string;
  kind: AnnotationKind;
  /** Exact substring of the snippet code to anchor to. */
  match: string;
  /** 1-based occurrence of `match`, defaults to 1. */
  occurrence?: number;
  body: string;
};

/** Index of the `n`th (1-based) occurrence of `needle`, or -1 if not found. */
function nthIndexOf(haystack: string, needle: string, n: number): number {
  let index = -1;
  for (let i = 0; i < n; i++) {
    index = haystack.indexOf(needle, index + 1);
    if (index === -1) return -1;
  }
  return index;
}

export type ResolvedAnnotations = {
  /** Shiki decorations for the annotations that anchored to the code. */
  ranges: DecorationItem[];
  /** Annotations whose `match`/`occurrence` did not resolve to a range. */
  misses: { id: string; match: string }[];
};

/**
 * Resolve authored annotations against a snippet's code into Shiki decorations.
 *
 * This never throws: an annotation whose `match` (at its `occurrence`) can't be
 * found in the code is collected into `misses` and simply skipped, rather than
 * crashing the whole server-rendered case-study page over one bad authored
 * note. The `data-n` superscript on each resolved token stays the annotation's
 * 1-based index in the *original* `annotations` array — misses are dropped from
 * the decorations, but never renumber the survivors (the margin-notes list on
 * the client numbers against that same original order).
 */
export function resolveAnnotations(
  code: string,
  annotations: CodeAnnotation[]
): ResolvedAnnotations {
  const ranges: DecorationItem[] = [];
  const misses: { id: string; match: string }[] = [];

  annotations.forEach((a, i) => {
    const start = nthIndexOf(code, a.match, a.occurrence ?? 1);
    if (start === -1) {
      misses.push({ id: a.id, match: a.match });
      return;
    }
    ranges.push({
      start,
      end: start + a.match.length,
      properties: {
        class: `annot annot-${a.kind}`,
        'data-annot': a.id,
        'data-kind': a.kind,
        'data-n': String(i + 1),
        tabindex: 0,
      },
    });
  });

  return { ranges, misses };
}

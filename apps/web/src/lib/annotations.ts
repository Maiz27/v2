/**
 * Interactive code annotations: the V3 centerpiece. Real Sanity snippets carry
 * no annotations yet, so the case-study listing renders plain today, but the
 * component API is ready for authored notes to be attached per snippet.
 *
 * "decision" notes read in red (why this, what I rejected); "context" notes in
 * grey (what it does).
 */
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

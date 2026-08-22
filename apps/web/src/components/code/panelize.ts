import type { CodeAnnotation } from '@/lib/annotations';
import { highlight, highlightAnnotated } from '@/lib/highlight';
import type { Snippet } from '@/lib/sanity/types';

export type CodeListingPanel = {
  panelKey: string;
  html: string;
  filename: string;
  source: string | null;
  annotations: CodeAnnotation[];
};

type PanelizeOptions = {
  panelKey: string;
  snippet: Snippet;
  annotations?: CodeAnnotation[];
};

/** Highlight and normalize one authored snippet for the client listing module. */
export async function panelize({
  panelKey,
  snippet,
  annotations: annotationOverride,
}: PanelizeOptions): Promise<CodeListingPanel> {
  const text = snippet.code.code ?? '';
  const language = snippet.code.language || 'typescript';
  const annotations = annotationOverride ?? snippet.annotations ?? [];
  let html: string;
  if (annotations.length > 0) {
    const annotated = await highlightAnnotated(text, language, annotations);
    html = annotated.html;
    /* An authored annotation that no longer matches the code is skipped, not
       fatal; surface it here where the filename gives the author something to
       search for. */
    if (annotated.misses.length > 0 && process.env.NODE_ENV !== 'production') {
      console.warn(
        `panelize: ${annotated.misses.length} annotation(s) in ${snippet.filename} did not match the code and were skipped:`,
        annotated.misses
      );
    }
  } else {
    html = await highlight(text, language);
  }

  return {
    panelKey,
    html,
    filename: snippet.filename,
    source: snippet.source ?? null,
    annotations,
  };
}

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
  const html =
    annotations.length > 0
      ? (await highlightAnnotated(text, language, annotations)).html
      : await highlight(text, language);

  return {
    panelKey,
    html,
    filename: snippet.filename,
    source: snippet.source ?? null,
    annotations,
  };
}

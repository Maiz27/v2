import { highlight, highlightAnnotated } from '@/lib/highlight';
import CodeGroupClient from './CodeGroupClient';
import { SnippetGroup } from '@/lib/sanity/types';

/**
 * A tabbed group of snippets does its own server-side highlighting (rather
 * than delegating per-tab to CodeParser) so CodeGroupClient can own a single
 * shared code panel + notes rail that swaps content per tab, instead of
 * mounting one fully independent AnnotatedListing (with its own nested grid
 * and notes column) per tab. The old per-tab-AnnotatedListing approach put
 * each tab's notes column inside the group's shared bordered code box, since
 * that box was only ever designed to wrap bare code.
 */
const CodeGroup = async ({ group, id }: { group: SnippetGroup; id: string }) => {
  const { title, snippets } = group;

  const panels = await Promise.all(
    snippets.map(async (s) => {
      const { language, code } = s.code;
      const text = code ?? '';
      const lang = language || 'typescript';
      const annotations = s.annotations ?? [];
      const html =
        annotations.length > 0
          ? (await highlightAnnotated(text, lang, annotations)).html
          : await highlight(text, lang);
      return { filename: s.filename, source: s.source, html, annotations };
    })
  );

  return <CodeGroupClient id={id} title={title} panels={panels} />;
};

export default CodeGroup;

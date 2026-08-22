import type { CodeAnnotation } from '@/lib/annotations';
import { Snippet } from '@/lib/sanity/types';
import CodeListing from './CodeListing';
import { panelize } from './panelize';

type Props = {
  id: string;
  snippet: Snippet;
  /**
   * Optional authored annotations. Case-study snippets carry these today,
   * which upgrades the listing to the hybrid margin-notes / popover view;
   * without them (or on a future snippet with none) it stays a plain listing.
   */
  annotations?: CodeAnnotation[];
};

/**
 * A standalone snippet is the one-panel form of the shared Ledger listing.
 * Shiki highlighting and authored defaults run through the same panelizer as
 * tabbed groups.
 */
const CodeParser = async ({ id, snippet, annotations }: Props) => {
  const panel = await panelize({ panelKey: id, snippet, annotations });
  return <CodeListing id={id} panels={[panel]} header={{ kind: 'caption' }} />;
};

export default CodeParser;

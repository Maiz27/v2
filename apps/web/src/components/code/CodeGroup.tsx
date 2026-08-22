import CodeListing from './CodeListing';
import { panelize } from './panelize';
import { SnippetGroup } from '@/lib/sanity/types';

/** A snippet group is the tabbed form of the shared Ledger listing. */
const CodeGroup = async ({ group, id }: { group: SnippetGroup; id: string }) => {
  const { title, snippets } = group;

  const panels = await Promise.all(
    snippets.map((snippet) =>
      panelize({ panelKey: `${id}:${snippet._key}`, snippet })
    )
  );

  return (
    <CodeListing
      id={id}
      panels={panels}
      header={{ kind: 'tabs', title }}
    />
  );
};

export default CodeGroup;

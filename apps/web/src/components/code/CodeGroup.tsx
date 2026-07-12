import { Suspense } from 'react';
import CodeParser from './CodeParser';
import CodeGroupClient from './CodeGroupClient';
import { SnippetGroup } from '@/lib/sanity/types';

const CodeGroup = ({ group, id }: { group: SnippetGroup; id: string }) => {
  const { title, snippets } = group;

  return (
    <CodeGroupClient
      id={id}
      title={title}
      tabs={snippets.map((s) => ({ filename: s.filename, source: s.source }))}
    >
      {snippets.map((snippet) => (
        <Suspense key={snippet._key}>
          <CodeParser
            id={snippet._key}
            snippet={snippet}
            annotations={snippet.annotations}
            isGroup
          />
        </Suspense>
      ))}
    </CodeGroupClient>
  );
};

export default CodeGroup;

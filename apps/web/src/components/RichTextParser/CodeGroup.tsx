import { Suspense } from 'react';
import CodeParser from './CodeParser';
import CodeGroupClient from './CodeGroupClient';
import { SnippetGroup } from '@/lib/sanity/types';

const CodeGroup = ({ group, id }: { group: SnippetGroup; id: string }) => {
  const { snippets } = group;

  return (
    <CodeGroupClient snippets={snippets} id={id}>
      {snippets.map((snippet) => (
        <Suspense key={snippet._key}>
          <CodeParser id={snippet._key} snippet={snippet} isGroup />
        </Suspense>
      ))}
    </CodeGroupClient>
  );
};

export default CodeGroup;

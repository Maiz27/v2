import { memo } from 'react';
import Image from 'next/image';
import {
  PortableText,
  PortableTextReactComponents,
  PortableTextTypeComponentProps,
} from '@portabletext/react';
import CodeParser from '@/components/code/CodeParser';
import CodeGroup from '@/components/code/CodeGroup';
import { createSlug } from '@/lib/utilities';
import { buildOutline, plainText } from '@/lib/outline';
import { urlFor } from '@/lib/sanity/client';
import { BlockContent, Snippet, SnippetGroup } from '@/lib/sanity/types';

type props = {
  content: BlockContent;
};

/**
 * Renders a case study's Portable Text as Ledger typography: serif body capped
 * around 62ch, section headings carrying a numbered mono index, quotes, lists,
 * inline code, and first-class code listings via the code/ components.
 *
 * Heading ids, the numbered h2 badge and code-snippet ids all come from
 * `buildOutline` — the single traversal the Contents rail also renders against
 * — so the body anchors and the TOC hrefs are guaranteed to match. Only h4
 * (which is body-only, never in the TOC) derives its id inline via the shared
 * `plainText` + `createSlug`.
 */
const RichTextParser = memo(({ content }: props) => {
  const outline = buildOutline(content);
  let imageIndex = 0;

  const components: PortableTextReactComponents = {
    types: {
      image: ({ value }) => {
        const imgUrl = urlFor(value).url();
        imageIndex++;
        // `altText` comes from the getProjectBySlug content projection
        // ("altText": asset->altText), which the generic Portable Text image
        // type from @portabletext/react doesn't know about. Cast until that's
        // reflected in a query-specific type; regenerate lib/sanity/types.ts
        // via `pnpm generate:types` if the schema changes.
        const altText = (value as { altText?: string | null }).altText;
        return (
          <figure className='my-8 border border-rule bg-paper-raised p-1.5'>
            <Image
              width={1280}
              height={800}
              src={imgUrl}
              loading='lazy'
              alt={altText ?? `Figure ${imageIndex}`}
              className='h-auto w-full'
            />
          </figure>
        );
      },
      snippet: ({
        value,
      }: PortableTextTypeComponentProps<Snippet & { _key: string }>) => {
        const id = outline.itemFor(value._key)?.id ?? '';
        return (
          <CodeParser id={id} snippet={value} annotations={value.annotations} />
        );
      },
      snippetGroup: ({
        value,
      }: PortableTextTypeComponentProps<SnippetGroup & { _key: string }>) => {
        const id = outline.itemFor(value._key)?.id ?? '';
        return <CodeGroup group={value} id={id} />;
      },
    },
    marks: {
      strong: ({ children }) => (
        <strong className='font-semibold text-ink'>{children}</strong>
      ),
      em: ({ children }) => <em>{children}</em>,
      code: ({ children }) => <code>{children}</code>,
      link: ({ children, value }) => {
        const target = value?.href?.startsWith('http') ? '_blank' : undefined;
        const rel = target === '_blank' ? 'noreferrer noopener' : undefined;
        return (
          <a href={value?.href} target={target} rel={rel}>
            {children}
          </a>
        );
      },
    },
    block: {
      h2: ({ children, value }) => {
        const item = outline.itemFor(value._key);
        const id = item?.id ?? createSlug(plainText(value));
        const n = item?.type === 'h2' ? item.n : '';
        return (
          <h2
            id={id}
            className='font-display mt-14 mb-5 flex items-baseline gap-3 text-[1.5rem] font-bold leading-snug md:text-[1.75rem]'
          >
            <span className='font-mono text-[0.72rem] font-normal text-mark'>
              {n}
            </span>
            <span>{children}</span>
          </h2>
        );
      },
      h3: ({ children, value }) => (
        <h3
          id={outline.itemFor(value._key)?.id ?? createSlug(plainText(value))}
          className='font-display mt-10 mb-4 text-[1.2rem] font-bold md:text-[1.35rem]'
        >
          {children}
        </h3>
      ),
      h4: ({ children, value }) => (
        <h4
          id={createSlug(plainText(value))}
          className='font-display mt-8 mb-3 text-[1.05rem] font-bold'
        >
          {children}
        </h4>
      ),
      normal: ({ children }) => <p>{children}</p>,
      blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    },
    list: {
      bullet: ({ children }) => <ul>{children}</ul>,
      number: ({ children }) => <ol>{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
    },
    hardBreak: () => <br />,
    unknownMark: ({ children }) => <>{children}</>,
    unknownType: () => null,
    unknownBlockStyle: ({ children }) => <p>{children}</p>,
    unknownList: ({ children }) => <ul>{children}</ul>,
    unknownListItem: ({ children }) => <li>{children}</li>,
  };

  return (
    <div className='ledger-prose'>
      <PortableText
        value={content}
        components={components}
        onMissingComponent={false}
      />
    </div>
  );
});

RichTextParser.displayName = 'RichTextParser';

export default RichTextParser;

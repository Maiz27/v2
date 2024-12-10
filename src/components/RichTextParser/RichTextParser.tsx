import React, { memo } from 'react';
import Image from 'next/image';
import {
  PortableText,
  PortableTextReactComponents,
  PortableTextTypeComponentProps,
} from '@portabletext/react';
import { Code, RichText } from '@/lib/types';
import CodeParser from './CodeParser';
import { createSlug } from '@/lib/utilities';

type props = {
  content: RichText;
};

const RichTextParser = memo(({ content }: props) => {
  let codeBlockCounter = 0;

  const myPortableTextComponents: PortableTextReactComponents = {
    types: {
      image: ({ value }) => (
        <Image
          loading='lazy'
          src={value.imageUrl}
          alt=''
          className='w-4/5 mx-auto'
        />
      ),
      callToAction: ({ value, isInline }) =>
        isInline ? (
          <a
            href={value.url}
            className='underline underline-offset-4 text-primary'
          >
            {value.text}
          </a>
        ) : (
          <div className='callToAction'>{value.text}</div>
        ),
      code: ({ value }: PortableTextTypeComponentProps<Code>) => {
        const id = `code-${++codeBlockCounter}`;
        return (
          <CodeParser
            id={id}
            code={value.code}
            language={value.language}
            filename={value.filename}
          />
        );
      },
    },
    marks: {
      em: ({ children }) => <em className=''>{children}</em>,
      link: ({ children, value }) => {
        const target = value.href.startsWith('http') ? '_blank' : undefined;
        const rel = target === '_blank' ? 'noreferrer noopener' : undefined;

        return (
          <a
            href={value.href}
            target={target}
            rel={rel}
            className='underline underline-offset-4 text-primary'
          >
            {children}
          </a>
        );
      },

      // Add any other custom marks you want to handle
    },
    block: {
      h1: ({ children }) => (
        <h1
          id={createSlug(children?.toString() || '')}
          className='text-4xl scroll-m-16 px-2 mt-10 mb-8'
        >
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2
          id={createSlug(children?.toString() || '')}
          className='text-3xl scroll-m-16 px-2 mt-8 mb-6'
        >
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3
          id={createSlug(children?.toString() || '')}
          className='text-2xl scroll-m-16 px-2 mt-6 mb-4'
        >
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4
          id={createSlug(children?.toString() || '')}
          className='text-xl scroll-m-16 px-2 mt-5 mb-3 '
        >
          {children}
        </h4>
      ),
      h5: ({ children }) => (
        <h5
          id={createSlug(children?.toString() || '')}
          className='text-lg scroll-m-16 px-2 mt-4 mb-2 '
        >
          {children}
        </h5>
      ),
      h6: ({ children }) => (
        <h6
          id={createSlug(children?.toString() || '')}
          className='text-base scroll-m-16 px-2 mt-3 mb-1 '
        >
          {children}
        </h6>
      ),
      normal: ({ children }) => (
        <p className='text-base mb-2 p-2 opacity-80'>{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className='text-base italic border-l-4 pl-2 mb-2 opacity-80'>
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className='list-disc pl-10 pr-2 space-y-2 opacity-80 mb-4'>
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className='list-decimal pl-10 pr-2 space-y-2'>{children}</ol>
      ),
      // Add any other custom list types you want to handle
    },
    listItem: {
      bullet: ({ children }) => <li className=''>{children}</li>,
      // Add any other custom list item types you want to handle
    },
    hardBreak: () => <br />,
    unknownMark: () => null,
    unknownType: () => null,
    unknownBlockStyle: () => null,
    unknownList: () => null,
    unknownListItem: () => null,
  };

  return (
    <PortableText
      value={content}
      components={myPortableTextComponents}
      onMissingComponent={false}
    />
  );
});

RichTextParser.displayName = 'Rich Text Parser';

export default RichTextParser;

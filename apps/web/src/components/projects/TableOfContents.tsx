import Link from 'next/link';
import Heading from '../heading/Heading';
import AnimateInView from '../animationWrappers/AnimateInView';
import { createSlug, extractFilename } from '@/lib/utilities';
import {
  HiMinusSmall,
  HiOutlineCodeBracketSquare,
  HiOutlineListBullet,
} from 'react-icons/hi2';
import { BlockContent } from '@/lib/sanity/types';

type TableOfContentsProps = {
  content: BlockContent;
};

type TOCItem = {
  id: string;
  text: string;
  level: number;
  type: Tags;
};

type Tags = 'h2' | 'h3' | 'code';

const ICONS = {
  h2: <HiMinusSmall />,
  h3: <HiMinusSmall />,
  code: <HiOutlineCodeBracketSquare />,
};

const HEADING_TAGS = ['h2', 'h3'] as const;
const CODE_TAG = 'code';

const TableOfContents = ({ content }: TableOfContentsProps) => {
  const tocItems: TOCItem[] = [];
  let codeBlockCounter = 0;

  content.forEach((block) => {
    // Handle headings
    if (
      block._type === 'block' &&
      HEADING_TAGS.includes(block.style as (typeof HEADING_TAGS)[number])
    ) {
      const text = block.children
        ?.map((child) => child.text)
        .filter(Boolean)
        .join('');

      if (text) {
        tocItems.push({
          id: createSlug(text),
          text,
          level: getHeadingLevel(block.style!),
          type: block.style as Tags,
        });
      }
    }

    // Handle code blocks
    if (block._type === CODE_TAG) {
      const { name = 'Snippet' } = extractFilename(block.filename || 'Snippet');
      tocItems.push({
        id: `code-${++codeBlockCounter}`,
        text: `Code: ${name}`,
        level: getHeadingLevel(CODE_TAG),
        type: CODE_TAG,
      });
    }
  });

  return (
    <aside className='mt-4'>
      <Heading icon={<HiOutlineListBullet />} heading='Table of Contents'>
        <AnimateInView tag='nav'>
          <ul className='ml-4 space-y-2'>
            {tocItems.map((item) => (
              <li
                key={item.id}
                className={`${
                  item.level === 3 ? 'ml-8 text-base' : ''
                } flex gap-2 items-center hover:text-primary transition-colors`}
              >
                <span className='text-lg'>{ICONS[item.type]}</span>
                <Link href={`#${item.id}`}>{item.text}</Link>
              </li>
            ))}
          </ul>
        </AnimateInView>
      </Heading>
    </aside>
  );
};

export default TableOfContents;

const getHeadingLevel = (type: string) => {
  switch (type) {
    case 'h2':
      return 2;
    case 'h3':
      return 3;
    case 'code':
      return 3;
    default:
      return 1;
  }
};

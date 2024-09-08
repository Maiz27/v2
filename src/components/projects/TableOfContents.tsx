'use client';
import Heading from '../heading/Heading';
import AnimateInView from '../animationWrappers/AnimateInView';
import { extractFilename, smoothScrollToElement } from '@/lib/utilities';
import { RichText } from '@/lib/types';
import {
  HiMinusSmall,
  HiOutlineCodeBracketSquare,
  HiOutlineListBullet,
} from 'react-icons/hi2';

type TableOfContentsProps = {
  content: RichText;
};

type TOCItem = {
  id: string;
  text: string;
  level: number;
  type: 'h2' | 'h3' | 'code';
};

const TableOfContents = ({ content }: TableOfContentsProps) => {
  const tocItems: TOCItem[] = [];
  let codeBlockCounter = 0;

  const icons = {
    h2: <HiMinusSmall />,
    h3: <HiMinusSmall />,
    code: <HiOutlineCodeBracketSquare />,
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    smoothScrollToElement(id);
  };

  content.forEach((block) => {
    if (
      block._type === 'block' &&
      (block.style === 'h2' || block.style === 'h3')
    ) {
      const text = block.children.map((child) => child.text).join('');
      const id = text.toLowerCase().replace(/\s+/g, '-');
      tocItems.push({
        id,
        text,
        level: block.style === 'h2' ? 2 : 3,
        type: block.style === 'h2' ? 'h2' : 'h3',
      });
    } else if (block._type === 'code') {
      const { name } = extractFilename(block.filename || 'Snippet');
      const text = `Code: ${name || 'Snippet'}`;
      const id = `code-${++codeBlockCounter}`;
      tocItems.push({
        id,
        text,
        level: 3,
        type: 'code',
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
                <span className='text-lg'>{icons[item.type]}</span>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </AnimateInView>
      </Heading>
    </aside>
  );
};

export default TableOfContents;

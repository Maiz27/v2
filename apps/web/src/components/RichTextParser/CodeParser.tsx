import Link from 'next/link';
import { codeToHtml } from 'shiki';
import { HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2';
import { Snippet } from '@/lib/sanity/types';

type Props = {
  id: string;
  isGroup?: boolean;
  snippet: Snippet;
};

const CodeParser = async ({
  id,
  isGroup,
  snippet: { filename, source, code },
}: Props) => {
  const { language, code: text } = code;
  const html = await codeToHtml(text!, {
    lang: language!,
    theme: 'material-theme-ocean',
  });

  return (
    <div id={id} className='scroll-m-16 rounded-t-lg border-copy'>
      {!isGroup && (
        <h3 className='w-fit p-2 rounded-t-lg border-copy border-t border-x bg-primary text-background font-medium'>
          {filename}
        </h3>
      )}
      <div className='flex w-full justify-end p-2 bg-primary border-x border-cop rounded-tr-lg'>
        <Link
          href={source!}
          target='_blank'
          rel='noreferrer noopener'
          className={`flex items-center gap-1 text-background pl-2 ${
            source ? 'hover:underline underline-offset-4' : ''
          }`}
        >
          {source && <HiOutlineArrowTopRightOnSquare />}
        </Link>
      </div>
      <div
        className='border-x border-b border-copy rounded-b-xs'
        data-nosnippet
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default CodeParser;

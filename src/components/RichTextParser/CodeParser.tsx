import { codeToHtml } from 'shiki';
import { extractFilename } from '@/lib/utilities';
import { Code } from '@/lib/types';
import { HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2';

const CodeParser = async ({ id, language, code, filename }: Code) => {
  const { name, link } = extractFilename(filename);
  const html = await codeToHtml(code, {
    lang: language,
    theme: 'material-theme-ocean',
  });

  return (
    <div id={id}>
      <h3 className='bg-foreground flex w-full -mb-[7px] p-1 rounded-t-lg border-b border-border'>
        File:
        <a
          href={link!}
          target='_blank'
          rel='noreferrer noopener'
          className={`flex items-center gap-1 text-primary pl-2 ${
            link ? 'hover:underline underline-offset-4' : ''
          }`}
        >
          <span className='opacity-100'>{name}</span>
          {link && <HiOutlineArrowTopRightOnSquare />}
        </a>
      </h3>
      <div data-nosnippet dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default CodeParser;

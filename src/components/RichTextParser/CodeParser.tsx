import { Refractor, registerLanguage } from 'react-refractor';
import { extractFilename } from '@/lib/utilities';
import { Code } from '@/lib/types';
import { HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2';

import typescript from 'refractor/lang/typescript';
import javascript from 'refractor/lang/javascript';
import css from 'refractor/lang/css';
import java from 'refractor/lang/java';
import kotlin from 'refractor/lang/kotlin';
import dart from 'refractor/lang/dart';
import jsx from 'refractor/lang/jsx';
import tsx from 'refractor/lang/tsx';
import groq from 'refractor/lang/javascript';
import yaml from 'refractor/lang/yaml';

import './prism.css';

registerLanguage(typescript);
registerLanguage(javascript);
registerLanguage(css);
registerLanguage(java);
registerLanguage(kotlin);
registerLanguage(dart);
registerLanguage(jsx);
registerLanguage(tsx);
registerLanguage(groq);
registerLanguage(yaml);

const CodeParser = ({ id, language, code, filename }: Code) => {
  const { name, link } = extractFilename(filename);
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
      <Refractor language={language} value={code} />
    </div>
  );
};

export default CodeParser;

import { TOOLS } from '@/lib/Constants';
import { Tool as ToolType } from '@/lib/types';
import AnimateInView from '../animationWrappers/AnimateInView';
import TranslateWrapper from '../animationWrappers/TranslateWrapper';
import SvgTool from './SvgTool';

const Tools = () => {
  return (
    <AnimateInView
      delay={2}
      className='flex w-full overflow-hidden max-w-full border-b border-border p-4'
      style={{
        maskImage:
          'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)',
      }}
    >
      <TranslateWrapper>
        <>
          {Array.from(TOOLS).map(([key, tool]) => (
            <Tool key={key} tool={tool} />
          ))}
        </>
      </TranslateWrapper>
      <TranslateWrapper>
        <>
          {Array.from(TOOLS).map(([key, tool]) => (
            <Tool key={key} tool={tool} />
          ))}
        </>
      </TranslateWrapper>
    </AnimateInView>
  );
};

export default Tools;

const Tool = ({ tool: { name, href, icon } }: { tool: ToolType }) => {
  const isImage = typeof icon === 'string';

  return (
    <a
      href={href}
      data-tip={name}
      target='_blank'
      rel='noopener noreferrer'
      className='flex justify-center items-center space-x-1 group'
    >
      <div className='text-4xl group-hover:text-primary opacity-70 group-hover:opacity-100 transition-all'>
        {isImage ? (
          <SvgTool name={name} className='w-10 h-10' fill='currentColor' />
        ) : (
          <>{icon}</>
        )}
      </div>
      <span className='mt-2 text-sm text-center opacity-70 w-max font-bold group-hover:text-primary group-hover:opacity-100 transition-all'>
        {name}
      </span>
    </a>
  );
};

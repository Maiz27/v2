import { TOOLS } from '@/lib/Constants';
import { Tool as ToolType } from '@/lib/types';

const Tools = () => {
  return (
    <div
      className='flex w-full overflow-hidden max-w-full border-b border-copy/10 p-4'
      style={{
        maskImage:
          'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)',
      }}
    >
      <div className='flex w-full h-full animate-slide'>
        <ul className='w-full flex space-x-8 opacity-60'>
          {TOOLS.map((tool) => (
            <Tool key={tool.name} tool={tool} />
          ))}
          {/* {TOOLS.map((tool, idx) => (
            <Tool key={`${tool.name}_${idx}`} tool={tool} />
          ))} */}
        </ul>
      </div>
    </div>
  );
};

export default Tools;

const Tool = ({ tool }: { tool: ToolType }) => (
  <a
    href={tool.href}
    data-tip={tool.name}
    target='_blank'
    rel='noopener noreferrer'
    className='flex justify-center items-center space-x-1 group '
  >
    <div className='text-4xl group-hover:text-primary group-hover:opacity-100 transition-all'>
      {tool.icon}
    </div>
    <span className='mt-2 text-sm text-center w-max font-bold group-hover:text-primary group-hover:opacity-100 transition-all'>
      {tool.name}
    </span>
  </a>
);

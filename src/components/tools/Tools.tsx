import { TOOLS } from '@/lib/Constants';

const Tools = () => {
  return (
    <div
      className='flex overflow-hidden max-w-full border-b border-copy/10 p-4'
      style={{
        maskImage:
          'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)',
      }}
    >
      <div className='flex w-full h-full animate-slide'>
        <ul className='flex space-x-8 max-w-7xl opacity-60'>
          {TOOLS.map((tool) => (
            <Tool key={tool.name} tool={tool} />
          ))}
          {TOOLS.map((tool) => (
            <Tool key={`${tool.name}-duplicate`} tool={tool} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tools;

const Tool = ({ tool }: { tool: { icon: JSX.Element; name: string } }) => (
  <li className='flex justify-center items-center space-x-1'>
    <div className='text-4xl'>{tool.icon}</div>
    <span className='mt-2 text-sm text-center w-max font-bold'>
      {tool.name}
    </span>
  </li>
);

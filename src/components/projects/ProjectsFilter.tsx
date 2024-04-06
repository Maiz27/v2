'use client';
import { PROJECT_STATUS, TOOLS, NON_STACK_TOOLS } from '@/lib/Constants';

const ProjectsFilter = () => {
  return (
    <div className='flex flex-col lg:flex-row justify-end lg:items-center mt-5 gap-2'>
      <input placeholder='Name' type='name' className='py-2' />

      <select className='py-2 lg:max-w-xs'>
        <option disabled selected>
          Status
        </option>
        {PROJECT_STATUS.map((status) => (
          <option key={status}>{status}</option>
        ))}
      </select>
      <select className='py-2 lg:max-w-xs'>
        <option disabled selected>
          Tool
        </option>
        {TOOLS.filter((tool) => !NON_STACK_TOOLS.includes(tool.name)).map(
          ({ name }) => (
            <option key={name}>{name}</option>
          )
        )}
      </select>
    </div>
  );
};

export default ProjectsFilter;

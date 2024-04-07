'use client';
import ToolsModal from './ToolsModal';
import CTA from '@/components/CTA/CTA';
import IconCTA from '@/components/CTA/IconCTA';
import { PROJECT_STATUS } from '@/lib/Constants';
import useProjectFilters from '@/lib/hooks/useProjectFilters';
import { HiOutlineMinusCircle } from 'react-icons/hi2';

const ProjectsFilter = () => {
  const { state, handleChange, handleToolsSelection, resetFilters } =
    useProjectFilters();

  return (
    <div>
      <div className='flex flex-col lg:flex-row justify-end lg:items-center mt-5 gap-2'>
        <input
          placeholder='Name'
          type='name'
          name='name'
          value={state.name}
          onChange={handleChange}
        />

        <select
          className='lg:max-w-xs'
          name='status'
          value={state.status}
          onChange={handleChange}
        >
          <option disabled value=''>
            Status
          </option>
          {PROJECT_STATUS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <div className='w-full lg:w-56'>
          <ToolsModal
            selectedTools={state.selectedTools}
            handleConfirm={handleToolsSelection}
          />
        </div>
        {(state.name || state.status || state.selectedTools?.length > 0) && (
          <>
            <CTA
              icon={<HiOutlineMinusCircle />}
              onClick={resetFilters}
              text='Clear Filter'
              className='lg:hidden'
            />
            <IconCTA
              icon={<HiOutlineMinusCircle />}
              onClick={resetFilters}
              name='Clear Filter'
              className='hidden lg:block'
            />
          </>
        )}
      </div>

      <div className='mt-2 px-2 flex flex-col items-start'>
        <FilterInfo label='Project Name' value={state.name} />
        <FilterInfo label='Selected Tools' value={state.selectedTools} />
      </div>
    </div>
  );
};

export default ProjectsFilter;

const FilterInfo = ({
  label,
  value,
}: {
  label: string;
  value: string | string[];
}) => {
  const isArray = Array.isArray(value);
  const isValuePresent = isArray ? value?.length > 0 : Boolean(value);

  return (
    isValuePresent && (
      <p className='text-sm'>
        <em className='text-base text-primary w-fit pr-2'>{label}:</em>
        {isArray ? value.join(', ') : value}
      </p>
    )
  );
};

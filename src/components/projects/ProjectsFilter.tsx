'use client';
import ToolsModal from './ToolsModal';
import CTA from '@/components/CTA/CTA';
import IconCTA from '@/components/CTA/IconCTA';
import { PROJECT_STATUS } from '@/lib/Constants';
import useProjectFilters from '@/lib/hooks/useProjectFilters';
import { Suspense } from 'react';
import { HiOutlineMinusCircle } from 'react-icons/hi2';
import AnimateInView from '../animationWrappers/AnimateInView';

const ProjectsFilter = ({ projectsTotal }: { projectsTotal: number }) => {
  return (
    <Suspense>
      <Filter projectsTotal={projectsTotal} />
    </Suspense>
  );
};

export default ProjectsFilter;

const Filter = ({ projectsTotal }: { projectsTotal: number }) => {
  const { state, handleChange, handleTechSelection, resetFilters } =
    useProjectFilters();

  const selectedOptions = state.status || state.selectedTech?.length > 0;
  return (
    <>
      <AnimateInView
        delay={1.4}
        className='flex flex-col-reverse lg:flex-row justify-between mt-5 gap-2'
      >
        <h2 className='text-xl text-center lg:text-left my-auto'>
          <span className='text-primary opacity-100 pr-2'>{projectsTotal}</span>
          Projects
        </h2>

        <div className='flex flex-col lg:flex-row lg:items-center gap-2'>
          <label htmlFor='status'>
            <span className='sr-only'>Status</span>
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
          </label>
          <div className='w-full lg:w-40'>
            <ToolsModal
              selectedTech={state.selectedTech}
              handleConfirm={handleTechSelection}
            />
          </div>
          {selectedOptions && (
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
      </AnimateInView>

      <div className='mt-2 px-2 flex flex-col items-start'>
        <FilterInfo label='Selected Tools' value={state.selectedTech} />
      </div>
    </>
  );
};

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

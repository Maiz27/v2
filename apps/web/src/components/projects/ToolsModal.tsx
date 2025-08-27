'use client';

import { useEffect, useState } from 'react';
import Heading from '../heading/Heading';
import BaseModal from '../ui/BaseModal';
import { HiOutlineAdjustmentsVertical } from 'react-icons/hi2';
import { useTools } from '@/lib/context/ToolProvider';

type Props = {
  selectedTech: string[];
  handleConfirm: (tools: string[]) => void;
};

const ToolsModal = ({ selectedTech, handleConfirm }: Props) => {
  const [selection, setSelection] = useState<string[]>(selectedTech);
  const tools = useTools();

  useEffect(() => {
    setSelection(selectedTech);
  }, [selectedTech]);

  const handleSelect = (tool: string) => {
    if (selection.includes(tool)) {
      setSelection((prev) => prev.filter((name) => name !== tool));
    } else {
      setSelection((prev) => [...prev, tool]);
    }
  };

  const confirm = () => {
    handleConfirm(selection);
  };

  return (
    <BaseModal
      confirm={{ action: confirm }}
      buttonIcon={<HiOutlineAdjustmentsVertical />}
      buttonText='All Tools'
      classNames={`${
        selectedTech?.length > 0 ? 'border border-primary text-primary' : ''
      }`}
    >
      <Heading
        Tag='h3'
        heading='Select Tools'
        icon={<HiOutlineAdjustmentsVertical />}
      />
      <div className='bg-background p-4 rounded-lg flex flex-wrap items-center gap-2'>
        {tools.map(({ name }) => (
          <button
            key={name}
            onClick={() => handleSelect(name)}
            className={`text-sm p-2 rounded-lg transition-colors ${
              selection.includes(name)
                ? 'bg-primary text-background'
                : 'bg-foreground'
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </BaseModal>
  );
};

export default ToolsModal;

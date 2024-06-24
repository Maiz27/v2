import { ChangeEventHandler } from 'react';

type Props = {
  name: string;
  state?: Object;
  errors?: Object;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined;
};

const Textarea = ({
  name,
  state,
  errors,
  onChange = () => {},
  required = false,
  disabled = false,
  placeholder = 'Type here...',
}: Props) => {
  const value = state
    ? (state[name as keyof typeof state] as unknown as string)
    : ('' as string);

  return (
    <div className='flex w-full flex-col space-y-1'>
      <textarea
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className='h-64 resize-y'
      />
      {errors && errors[name as keyof typeof state] && (
        <span className='text-sm text-red-500'>
          {errors[name as keyof typeof state]}
        </span>
      )}
    </div>
  );
};

export default Textarea;

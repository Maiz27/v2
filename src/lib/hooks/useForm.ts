import { ChangeEvent, FormEvent, useState } from 'react';

type ValidationRule = (value: any) => string | null;

interface ValidationRules {
  [key: string]: ValidationRule;
}

const useForm = <T extends object>(initialState: T, rules: ValidationRules) => {
  const [state, setState] = useState<T>(initialState);
  const [errors, setErrors] = useState<{ [K in keyof T]?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });

    if (rules[name]) {
      const errorMessage = rules[name](value);
      setErrors({
        ...errors,
        [name]: errorMessage,
      });
    }
  };

  const reset = () => {
    setState(initialState);
    setErrors({});
  };

  const onSubmit = async (
    e: FormEvent<HTMLFormElement>,
    handle: () => Promise<any>
  ) => {
    try {
      e.preventDefault();
      setLoading(true);
      await handle();
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    state,
    errors,
    loading,
    handleChange,
    reset,
    onSubmit,
  };
};

export default useForm;

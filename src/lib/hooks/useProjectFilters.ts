import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type State = {
  status: string;
  selectedTech: string[];
};

const useProjectFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialState = useMemo(
    () => ({
      status: (searchParams.get('status') as string) || '',
      selectedTech: (searchParams.get('tech') as string)?.split(',') || [],
    }),
    [searchParams]
  );

  const [state, setState] = useState<State>(initialState);

  const updateURL = useCallback(
    (newState: State) => {
      const query = new URLSearchParams();

      if (newState.status) {
        query.set('status', newState.status);
      }

      if (newState.selectedTech?.length > 0) {
        query.set('tech', newState.selectedTech.join(','));
      }

      router.push(`${pathname}?${query.toString()}`);
    },
    [pathname, router]
  );

  const handleTechSelection = useCallback(
    (tools: string[]) => {
      setState((prevState) => {
        const newState = { ...prevState, selectedTech: tools };
        updateURL(newState);
        return newState;
      });
    },
    [updateURL]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setState((prevState) => {
        const newState = { ...prevState, [name]: value };
        updateURL(newState);
        return newState;
      });
    },
    [updateURL]
  );

  const resetFilters = useCallback(() => {
    const newState = { name: '', status: '', selectedTech: [] };
    setState(newState);
    updateURL(newState);
  }, [updateURL]);

  // Update state when URL changes
  useEffect(() => {
    setState({
      status: (searchParams.get('status') as string) || '',
      selectedTech: (searchParams.get('tech') as string)?.split(',') || [],
    });
  }, [searchParams]);

  return {
    state,
    handleChange,
    handleTechSelection,
    resetFilters,
  };
};

export default useProjectFilters;

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type State = {
  name: string;
  status: string;
  selectedTools: string[];
};

const useProjectFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialState = useMemo(
    () => ({
      name: (searchParams.get('name') as string) || '',
      status: (searchParams.get('status') as string) || '',
      selectedTools: (searchParams.get('tools') as string)?.split(',') || [],
    }),
    [searchParams]
  );

  const [state, setState] = useState<State>(initialState);

  const updateURL = useCallback(
    (newState: State) => {
      const query = new URLSearchParams();

      if (newState.name) {
        query.set('name', newState.name);
      }

      if (newState.status) {
        query.set('status', newState.status);
      }

      if (newState.selectedTools?.length > 0) {
        query.set('tools', newState.selectedTools.join(','));
      }

      router.push(`${pathname}?${query.toString()}`);
    },
    [pathname, router]
  );

  const handleToolsSelection = useCallback(
    (tools: string[]) => {
      setState((prevState) => {
        const newState = { ...prevState, selectedTools: tools };
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
    const newState = { name: '', status: '', selectedTools: [] };
    setState(newState);
    updateURL(newState);
  }, [updateURL]);

  // Update state when URL changes
  useEffect(() => {
    setState({
      name: (searchParams.get('name') as string) || '',
      status: (searchParams.get('status') as string) || '',
      selectedTools: (searchParams.get('tools') as string)?.split(',') || [],
    });
  }, [searchParams]);

  return {
    state,
    handleChange,
    handleToolsSelection,
    resetFilters,
  };
};

export default useProjectFilters;

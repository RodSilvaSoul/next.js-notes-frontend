/* eslint-disable no-unused-vars */
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import { useQuery } from 'react-query';
import { api } from 'services';

import { Note } from '@types';

interface ApplicationDataContextData {

  loadTags: (tagsData: string[]) => void;
  tags: string[];
  notes: Note[] | undefined;
  trashNotes: Note[] | undefined;
  archivedNotes: Note[] | undefined;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

const ApplicationDataContext = createContext<ApplicationDataContextData>(
  {} as any,
);

interface ApplicationDataProps {
  children: ReactNode;
}

export const ApplicationDataProvider = ({ children }: ApplicationDataProps) => {
  const [tags, setTags] = useState<string[]>([]);

  const {
    data, isLoading, isSuccess, isError,
  } = useQuery<Note[]>(
    'notes',
    async () => {
      const result = await api.get('/notes');
      return result.data;
    },
  );

  const notes = useMemo(
    () => data?.filter((noteDate) => {
      if (!noteDate.isArchived && !noteDate.isOnTrash) {
        return true;
      }
      return false;
    }),
    [data],
  );

  const trashNotes = useMemo(
    () => data?.filter((noteDate) => noteDate.isOnTrash),
    [data],
  );

  const archivedNotes = useMemo(
    () => data?.filter((noteDate) => noteDate.isArchived),
    [data],
  );

  const loadTags = useCallback((tagsData: string[]) => {
    setTags(tagsData);
  }, []);

  return (
    <ApplicationDataContext.Provider
      value={{
        isError,
        archivedNotes,
        isLoading,
        isSuccess,
        notes,
        trashNotes,
        loadTags,
        tags,
      }}
    >
      {children}
    </ApplicationDataContext.Provider>
  );
};

export const useApplicationData = () => useContext(ApplicationDataContext);

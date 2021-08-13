/* eslint-disable no-unused-vars */
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useCallback,
} from 'react';
import { useQuery } from 'react-query';
import { api } from 'services';

import { Note } from '@types';

interface ApplicationDataContextData {
  loadTags: (tagsData: string[]) => void;
  tags: string[];
  notes: Note[];
  trashNotes: Note[];
  archivedNotes: Note[];
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

  const notes = () => {
    const noteData = data?.filter((note) => {
      if (!note.isOnTrash && !note.isArchived) {
        return true;
      }
      return false;
    });

    if (noteData) {
      return noteData;
    }

    return [];
  };

  const trashNotes = () => {
    const noteData = data?.filter((noteDate) => noteDate.isOnTrash);
    if (noteData) {
      return noteData;
    }
    return [];
  };

  const archivedNotes = () => {
    const noteData = data?.filter((noteDate) => noteDate.isArchived);
    if (noteData) {
      return noteData;
    }
    return [];
  };

  const loadTags = useCallback((tagsData: string[]) => {
    setTags(tagsData);
  }, []);

  return (
    <ApplicationDataContext.Provider
      value={{
        archivedNotes: archivedNotes(),
        trashNotes: trashNotes(),
        notes: notes(),
        loadTags,
        tags,
        isError,
        isLoading,
        isSuccess,
      }}
    >
      {children}
    </ApplicationDataContext.Provider>
  );
};

export const useData = () => useContext(ApplicationDataContext);

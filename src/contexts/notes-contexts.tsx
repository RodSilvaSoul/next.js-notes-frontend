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

interface NotesContextData {
  addNewNote: () => void;
  cancelNewNote: () => void;
  loadTags: (tagsData: string[]) => void;
  tags: string[];
  notes: Note[] | undefined;
  trashNotes: Note[] | undefined;
  archivedNotes: Note[] | undefined;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isNoteTextAreaVisible: boolean;
}

const NotesContext = createContext<NotesContextData>({} as any);

interface NotesProviderProps {
  children: ReactNode;
}

export const NotesProvider = ({ children }: NotesProviderProps) => {
  const [isNoteTextAreaVisible, setIsNoteTextAreaVisible] = useState(false);
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

  const addNewNote = useCallback(() => {
    setIsNoteTextAreaVisible(true);
  }, []);

  const cancelNewNote = useCallback(() => {
    setIsNoteTextAreaVisible(false);
  }, []);

  const loadTags = useCallback((tagsData: string[]) => {
    setTags(tagsData);
  }, []);

  return (
    <NotesContext.Provider
      value={{
        isError,
        archivedNotes,
        isLoading,
        isSuccess,
        notes,
        trashNotes,
        loadTags,
        tags,
        addNewNote,
        cancelNewNote,
        isNoteTextAreaVisible,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);

/* eslint-disable no-unused-vars */
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useCallback,
} from 'react';

interface NotesContextData {
  addNewNote: () => void;
  cancelNewNote: () => void;
  loadTags: (tagsData: string[]) => void;
  tags: string[];
  isNoteTextAreaVisible: boolean;
}

const NotesContext = createContext<NotesContextData>({} as any);

interface NotesProviderProps {
  children: ReactNode;
}

export const NotesProvider = ({ children }: NotesProviderProps) => {
  const [isNoteTextAreaVisible, setIsNoteTextAreaVisible] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

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

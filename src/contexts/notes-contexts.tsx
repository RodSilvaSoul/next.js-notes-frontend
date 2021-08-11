import {
  createContext, useState, ReactNode, useContext, useCallback,
} from 'react';

interface NotesContextData {
  addNewNote: () => void;
  cancelNewNote: () => void;
  isNoteTextAreaVisible: boolean;
}

const NotesContext = createContext<NotesContextData>({} as any);

interface NotesProviderProps {
  children: ReactNode;
}

export const NotesProvider = ({ children }: NotesProviderProps) => {
  const [isNoteTextAreaVisible, setIsNoteTextAreaVisible] = useState(false);

  const addNewNote = useCallback(() => {
    setIsNoteTextAreaVisible(true);
  }, []);

  const cancelNewNote = useCallback(() => {
    setIsNoteTextAreaVisible(false);
  }, []);

  return (
    <NotesContext.Provider
      value={{
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

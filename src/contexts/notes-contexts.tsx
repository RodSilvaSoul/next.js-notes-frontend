import {
  createContext, useState, ReactNode, useContext,
} from 'react';

interface NotesContextData {
  addNewNote: () => void;
  isNoteTextAreaVisible: boolean;
}

const NotesContext = createContext<NotesContextData>({} as any);

interface NotesProviderProps {
  children: ReactNode;
}

export const NotesProvider = ({ children }: NotesProviderProps) => {
  const [isNoteTextAreaVisible, setIsNoteTextAreaVisible] = useState(false);

  function addNewNote() {
    setIsNoteTextAreaVisible(isNoteTextAreaVisible);
  }

  return (
    <NotesContext.Provider
      value={{
        addNewNote,
        isNoteTextAreaVisible,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);

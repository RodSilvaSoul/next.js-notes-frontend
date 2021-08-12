import {
  useContext,
  createContext,
  ReactNode,
  useCallback,
  useState,
} from 'react';

interface ApplicationUseCase {
  addNewNote: () => void;
  cancelNewNote: () => void;
  isNoteTextAreaVisible: boolean;
}

const ApplicationUseCaseContext = createContext<ApplicationUseCase>({} as any);

interface ApplicationUseCaseProviderProps {
  children: ReactNode;
}

export const ApplicationUseCaseProvider = ({
  children,
}: ApplicationUseCaseProviderProps) => {
  const [isNoteTextAreaVisible, setIsNoteTextAreaVisible] = useState(false);

  const addNewNote = useCallback(() => {
    setIsNoteTextAreaVisible(true);
  }, []);

  const cancelNewNote = useCallback(() => {
    setIsNoteTextAreaVisible(false);
  }, []);

  return (
    <ApplicationUseCaseContext.Provider
      value={{
        addNewNote,
        cancelNewNote,
        isNoteTextAreaVisible,
      }}
    >
      {children}
    </ApplicationUseCaseContext.Provider>
  );
};

export const useUseCase = () => useContext(ApplicationUseCaseContext);

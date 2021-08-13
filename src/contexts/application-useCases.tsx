/* eslint-disable no-unused-vars */
import { useUpdatedNoteState } from 'hooks';
import {
  useContext,
  createContext,
  ReactNode,
  useCallback,
  useState,
} from 'react';

import { useData } from './application-data';

interface ApplicationUseCase {
  addNewNote: () => void;
  cancelNewNote: () => void;
  manageNote: (id: number, actionType: 'archive' | 'trash' | 'note') => void;
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

  const { notes } = useData();
  const { mutateAsync } = useUpdatedNoteState();

  const addNewNote = useCallback(() => {
    setIsNoteTextAreaVisible(true);
  }, []);

  const cancelNewNote = useCallback(() => {
    setIsNoteTextAreaVisible(false);
  }, []);

  const manageNote = useCallback(
    async (id: number, actionType: 'archive' | 'trash' | 'note') => {
      const actions = {
        archive: async () => {
          const noteData = notes?.find((note) => note.id === id);
          if (noteData) {
            noteData.isOnTrash = false;
            noteData.isArchived = true;
            await mutateAsync(noteData);
          }
        },
        trash: async () => {
          const noteData = notes?.find((note) => note.id === id);
          if (noteData) {
            noteData.isArchived = false;
            noteData.isOnTrash = true;
            await mutateAsync(noteData);
          }
        },
        note: async () => {
          const noteData = notes?.find((note) => note.id === id);
          if (noteData) {
            noteData.isArchived = false;
            noteData.isOnTrash = false;
            await mutateAsync(noteData);
          }
        },
      };

      const action = actions[actionType];
      await action();
    },
    [mutateAsync, notes],
  );

  return (
    <ApplicationUseCaseContext.Provider
      value={{
        manageNote,
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

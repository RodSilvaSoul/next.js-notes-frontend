/* eslint-disable no-unused-vars */

import { useQueryMutations } from 'hooks';
import {
  useContext,
  createContext,
  ReactNode,
  useCallback,
  useState,
} from 'react';

import { Note } from '@types';

type Actions = 'archive' | 'trash' | 'note' | 'delete' | 'update';

type EditNoteData = {
  id: number;
  title: string;
  note: string;
  isArchived: boolean;
  isOnTrash: boolean;
  isInView: boolean;
};

interface ApplicationUseCase {
  addNewNote: () => void;
  cancelNewNote: () => void;
  editNote: (data: EditNoteData) => void;
  manageNote: (actionType: Actions, data: Note) => Promise<void>;
  isNoteTextAreaVisible: boolean;
  dataToBeEdited: EditNoteData;
}

const ApplicationUseCaseContext = createContext<ApplicationUseCase>({} as any);

interface ApplicationUseCaseProviderProps {
  children: ReactNode;
}

export const ApplicationUseCaseProvider = ({
  children,
}: ApplicationUseCaseProviderProps) => {
  const [isNoteTextAreaVisible, setIsNoteTextAreaVisible] = useState(false);
  const { deleteMutation, updateMutation } = useQueryMutations();
  const [dataToBeEdited, setDataToBeEdited] = useState<EditNoteData>({
    id: 0,
    note: '',
    title: '',
    isArchived: false,
    isInView: false,
    isOnTrash: false,
  });

  const addNewNote = useCallback(() => {
    setIsNoteTextAreaVisible(true);
  }, []);

  const cancelNewNote = useCallback(() => {
    setIsNoteTextAreaVisible(false);
  }, []);

  const editNote = useCallback((data: EditNoteData) => {
    setDataToBeEdited({
      ...data,
    });
  }, []);

  const manageNote = useCallback(
    async (actionType: Actions, data: Note) => {
      const actions = {
        archive: async () => {
          const noteData = data;

          noteData.isOnTrash = false;
          noteData.isArchived = true;
          await updateMutation.mutateAsync(noteData);
        },
        trash: async () => {
          const noteData = data;

          noteData.isArchived = false;
          noteData.isOnTrash = true;
          await updateMutation.mutateAsync(noteData);
        },
        note: async () => {
          const noteData = data;

          noteData.isArchived = false;
          noteData.isOnTrash = false;
          await updateMutation.mutateAsync(noteData);
        },
        delete: async () => {
          await deleteMutation.mutateAsync(data.id);
        },
        update: async () => {
          await updateMutation.mutateAsync(data);
        },
      };

      const action = actions[actionType];
      await action();
    },
    [deleteMutation, updateMutation],
  );

  return (
    <ApplicationUseCaseContext.Provider
      value={{
        dataToBeEdited,
        editNote,
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

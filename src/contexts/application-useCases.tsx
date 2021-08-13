/* eslint-disable no-unused-vars */

import { Omit } from 'framer-motion/types/types';
import { useUpdatedNoteState } from 'hooks';
import {
  useContext,
  createContext,
  ReactNode,
  useCallback,
  useState,
} from 'react';

import { useData } from './application-data';

type Actions = 'archive' | 'trash' | 'note' | 'delete';

type EditNoteData = {
  id: number;
  title: string;
  note: string,
  isInView: boolean;
}

type UpdateNoteData = {
  title?: string;
  note?: string;
}

interface ApplicationUseCase {
  addNewNote: () => void;
  cancelNewNote: () => void;
  editNote: (data: EditNoteData) => void;
  manageNote: (id: number, actionType: Actions) => Promise<void>;
  updateNote: (id: number, data: UpdateNoteData) => Promise<void>;
  isNoteTextAreaVisible: boolean;
  editData: EditNoteData;
}

const ApplicationUseCaseContext = createContext<ApplicationUseCase>({} as any);

interface ApplicationUseCaseProviderProps {
  children: ReactNode;
}

export const ApplicationUseCaseProvider = ({
  children,
}: ApplicationUseCaseProviderProps) => {
  const [isNoteTextAreaVisible, setIsNoteTextAreaVisible] = useState(false);
  const { notes, trashNotes, archivedNotes } = useData();
  const { deleteMutation, updateMutation } = useUpdatedNoteState();
  const [editData, setEditNote] = useState<EditNoteData>({
    id: 0,
    note: '',
    title: '',
    isInView: false,
  });

  const addNewNote = useCallback(() => {
    setIsNoteTextAreaVisible(true);
  }, []);

  const cancelNewNote = useCallback(() => {
    setIsNoteTextAreaVisible(false);
  }, []);

  const editNote = useCallback((data: EditNoteData) => {
    setEditNote(data);
  }, []);

  const manageNote = useCallback(
    async (id: number, actionType: Actions) => {
      const actions = {
        archive: async () => {
          const data = [...notes, ...trashNotes];

          const noteData = data.find((note) => note.id === id);

          if (noteData) {
            noteData.isOnTrash = false;
            noteData.isArchived = true;
            await updateMutation.mutateAsync(noteData);
          }
        },
        trash: async () => {
          const data = [...notes, ...archivedNotes];

          const noteData = data.find((note) => note.id === id);

          if (noteData) {
            noteData.isArchived = false;
            noteData.isOnTrash = true;
            await updateMutation.mutateAsync(noteData);
          }
        },
        note: async () => {
          const data = [...notes, ...archivedNotes, ...trashNotes];

          const noteData = data.find((note) => note.id === id);

          if (noteData) {
            noteData.isArchived = false;
            noteData.isOnTrash = false;
            await updateMutation.mutateAsync(noteData);
          }
        },
        delete: async () => {
          await deleteMutation.mutateAsync(id);
        },
      };

      const action = actions[actionType];
      await action();
    },
    [updateMutation, notes, trashNotes, archivedNotes, deleteMutation],
  );

  const updateNote = useCallback(async (id: number, data: UpdateNoteData) => {
    const allData = [...archivedNotes, ...notes, ...trashNotes];
    const noteData = allData.find((note) => note.id === id);
    if (noteData) {
      await updateMutation.mutateAsync({
        ...noteData,
        ...data,
      });
    }
  }, [archivedNotes, notes, trashNotes, updateMutation]);

  return (
    <ApplicationUseCaseContext.Provider
      value={{
        updateNote,
        editData,
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

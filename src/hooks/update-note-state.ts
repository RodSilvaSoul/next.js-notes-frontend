import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { api, queryClient } from 'services';

import { Note } from '@types';

export const useUpdatedNoteState = () => {
  const updateMutation = useMutation(
    async (data: Note) => {
      await api.put(`/notes/${data.id}`, data);
    },
    {
      onMutate: async (data) => {
        await queryClient.cancelQueries('notes');

        const previousData = (await queryClient.getQueryData(
          'notes',
        )) as Note[];

        const index = previousData.findIndex(
          (dataNote) => dataNote.id === data.id,
        );

        if (index > -1) {
          const newData = previousData;

          newData[index] = data;

          queryClient.setQueryData('notes', newData);
        }

        return previousData;
      },
      onError: async (err, data, context) => {
        await queryClient.setQueryData('note', context);
        toast.error('Sorry, a error happened');
      },
      onSettled: async () => {
        await queryClient.invalidateQueries('notes');
      },
      onSuccess: () => {
        toast.success('Updated successfully');
      },
    },
  );

  const deleteMutation = useMutation(
    async (id: number) => {
      await api.delete(`/notes/${id}`);
    },
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries('notes');

        const previousData = (await queryClient.getQueryData(
          'notes',
        )) as Note[];

        const newData = previousData?.filter((note) => note.id !== id);

        queryClient.setQueryData('notes', newData);

        return previousData;
      },
      onError: async (err, data, context) => {
        await queryClient.setQueryData('note', context);
        toast.error('Sorry, a error happened');
      },
      onSettled: async () => {
        await queryClient.invalidateQueries('notes');
      },
      onSuccess: () => {
        toast.success('Deleted successfully');
      },
    },
  );

  return {
    deleteMutation,
    updateMutation,
  };
};
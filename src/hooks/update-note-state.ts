import { useMutation } from 'react-query';
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

        const previousData = await queryClient.getQueryData('notes') as Note[];

        const index = previousData.indexOf(data);

        if (index > -1) {
          const newData = previousData;

          newData[index] = data;

          queryClient.setQueryData('notes', newData);
        }

        return previousData;
      },
      onError: async (err, data, context) => {
        await queryClient.setQueryData('note', context);
      },
      onSettled: async () => {
        await queryClient.invalidateQueries('notes');
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
      },
      onSettled: async () => {
        await queryClient.invalidateQueries('notes');
      },
    },
  );

  return {
    deleteMutation,
    updateMutation,
  };
};

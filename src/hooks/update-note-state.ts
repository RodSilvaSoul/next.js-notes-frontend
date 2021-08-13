import { useMutation } from 'react-query';
import { api, queryClient } from 'services';

import { Note } from '@types';

export const useUpdatedNoteState = () => {
  const { mutateAsync } = useMutation(
    async (data: Note) => {
      await api.put(`/notes/${data.id}`, data);
    },
    {
      onMutate: async (data) => {
        await queryClient.cancelQueries('notes');

        const previousData = await queryClient.getQueryData('notes');

        await queryClient.setQueryData('notes', (old) => [
          ...(old as any),
          data,
        ]);

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
    mutateAsync,
  };
};

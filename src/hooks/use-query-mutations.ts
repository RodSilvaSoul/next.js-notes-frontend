import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { api, queryClient } from 'services';

import { Note } from '@types';

type FormData = {
  title: string;
  note: string;
};

export const useQueryMutations = () => {
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

        const newData = previousData;

        const index = newData?.findIndex((note) => note.id === data.id);

        if (index > -1) {
          newData[index] = data;
        }

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
    },
  );

  const saveMutation = useMutation(
    async (data: FormData) => {
      await api.post('/notes', data);
    },
    {
      onError: async (data) => {
        await queryClient.setQueryData('notes', data);
        toast.error('Sorry, an error happened', {
          closeOnClick: true,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries('notes');
        toast.success('Saved successfully! ✅', {
          closeOnClick: true,
        });
      },
      onSettled: async () => {
        await queryClient.invalidateQueries('notes');
      },
    },
  );

  const deleteMany = useMutation(async (id: number) => {
    await api.delete(`/notes/${id}`);
  });

  return {
    saveMutation,
    deleteMutation,
    updateMutation,
    deleteMany,
  };
};

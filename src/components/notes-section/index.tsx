import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { api, queryClient } from 'services';
import * as yup from 'yup';

import { Button, InputInline, NoteTextArea } from '@components/forms';
import { InputTag } from '@components/forms/input-tag';
import { useUseCase } from '@contexts/application-useCases';
import { yupResolver } from '@hookform/resolvers/yup';
import { theme } from '@styles/theme';

import notesImage from '../../../public/notes.png';
import { motionVariants } from './config';
import {
  Container,
  Header,
  Form,
  InnerContainer,
  AddNewNote,
  ButtonGroup,
} from './styles';

type FormData = {
  title: string;
  note: string;
};

const formNoteSchema = yup.object().shape({
  note: yup.string().required('Your must type a note'),
  title: yup.string().required('Your must type a note title'),
});

export const NotesSection = () => {
  const {
    isNoteTextAreaVisible,
    cancelNewNote,
    editData,
    addNewNote,
    editNote,
    updateNote,
  } = useUseCase();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(formNoteSchema),
  });

  useEffect(() => {
    reset({
      title: editData.title,
      note: editData.note,
    });

    if (editData.isInView) {
      addNewNote();
    }
  }, [editData, reset, addNewNote]);

  const { mutateAsync } = useMutation(
    async (data: FormData) => {
      await api.post('/notes', data);
    },
    {
      onError: () => {
        toast.error('Sorry, an error happened', {
          closeOnClick: true,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries('notes');
        cancelNewNote();
        toast.success('Saved successfully! ✅');
        reset({
          title: '',
          note: '',
        });
      },
    },
  );

  function handleCancelButton() {
    editNote({
      id: 0,
      isInView: false,
      note: '',
      title: '',
    });
    cancelNewNote();
  }

  const handleSentNote: SubmitHandler<FormData> = async (data) => {
    if (editData.isInView) {
      await updateNote(editData.id, data);
      return;
    }

    await mutateAsync(data);
  };

  return (
    <Container>
      <AnimatePresence>
        {!isNoteTextAreaVisible && (
          <AddNewNote
            variants={motionVariants}
            initial="enter"
            animate="show"
            exit="exit"
          >
            <Image
              alt="add new note"
              src={notesImage}
              height="250"
              width="250"
            />
            <h2>Add a new note</h2>
          </AddNewNote>
        )}
        {isNoteTextAreaVisible && (
          <InnerContainer
            variants={motionVariants}
            initial="enter"
            animate="show"
            exit="exit"
          >
            <Form onSubmit={handleSubmit(handleSentNote)}>
              <Header>
                <InputInline
                  error={errors.title}
                  className="note-title"
                  placeholder="Add a title"
                  autoComplete="off"
                  {...register('title')}
                />
                <InputTag />
              </Header>
              <NoteTextArea
                error={errors.noteTitle}
                aria-label="enter your note"
                {...register('note')}
              />
              <ButtonGroup>
                {editData.isInView && (
                  <Button
                    backgroundColor={theme.pallet.blue[400]}
                    type="submit"
                    aria-label="edit notes button"
                  >
                    update
                  </Button>
                )}
                {!editData.isInView && (
                <Button
                  backgroundColor={theme.pallet.green[500]}
                  type="submit"
                  aria-label="save notes button"
                >
                  Save
                </Button>
                )}
                <Button
                  backgroundColor={theme.pallet.red[500]}
                  type="button"
                  aria-label="cancel notes button"
                  onClick={handleCancelButton}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </Form>
          </InnerContainer>
        )}
      </AnimatePresence>
    </Container>
  );
};

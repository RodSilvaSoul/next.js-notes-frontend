import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { memo, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, InputInline, NoteTextArea } from '@components/forms';
import { InputTag } from '@components/forms/input-tag';
import { useUseCase } from '@contexts/application-useCases';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryMutations } from '@hooks/use-query-mutations';
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

const NotesSectionComponent = () => {
  const {
    isNoteTextAreaVisible,
    cancelNewNote,
    dataToBeEdited,
    addNewNote,
    editNote,
    manageNote,
  } = useUseCase();

  const { saveMutation } = useQueryMutations();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(formNoteSchema),
  });

  useEffect(() => {
    reset({
      title: dataToBeEdited.title,
      note: dataToBeEdited.note,
    });

    if (dataToBeEdited.isInView) {
      addNewNote();
    }
  }, [dataToBeEdited, reset, addNewNote]);

  function handleCancelButton() {
    editNote({
      id: 0,
      isInView: false,
      note: '',
      title: '',
      isArchived: false,
      isOnTrash: false,
    });
    cancelNewNote();
  }

  const handleSentNote: SubmitHandler<FormData> = async (data) => {
    if (dataToBeEdited.isInView) {
      await manageNote('update', {
        ...dataToBeEdited,
        ...data,
      });
      return;
    }

    await saveMutation.mutateAsync(data);
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
                {dataToBeEdited.isInView && (
                  <Button
                    backgroundColor={theme.pallet.blue[400]}
                    type="submit"
                    aria-label="edit notes button"
                    isLoading={isSubmitting}
                  >
                    update
                  </Button>
                )}
                {!dataToBeEdited.isInView && (
                  <Button
                    backgroundColor={theme.pallet.green[500]}
                    type="submit"
                    aria-label="save notes button"
                    isLoading={isSubmitting}
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

export const NotesSection = memo(NotesSectionComponent);

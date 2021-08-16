import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  memo, useContext, useEffect, useRef,
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ThemeContext } from 'styled-components';
import * as yup from 'yup';

import { Button, InputInline, NoteTextArea } from '@components/forms';
import { useUseCase } from '@contexts/application-useCases';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryMutations } from '@hooks/use-query-mutations';

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
  const formRef = useRef<HTMLFormElement>(null);
  const { pallet } = useContext(ThemeContext);
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
      formRef.current?.focus();
    }
  }, [dataToBeEdited, reset, addNewNote]);

  function handleCancelButton() {
    editNote({
      id: 0,
      note: '',
      title: '',
      isInView: false,
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

  function handleAddNewNote() {
    editNote({
      id: 0,
      note: '',
      title: '',
      isInView: false,
      isArchived: false,
      isOnTrash: false,
    });
    addNewNote();
  }

  return (
    <Container>
      <AnimatePresence>
        {!isNoteTextAreaVisible && (
          <AddNewNote
            variants={motionVariants}
            initial="enter"
            animate="show"
            exit="exit"
            onClick={handleAddNewNote}
          >
            <Image
              alt="add new note"
              src={notesImage}
              height="250"
              width="250"
            />
            <h2>Click to add a new note</h2>
          </AddNewNote>
        )}
        {isNoteTextAreaVisible && (
          <InnerContainer
            variants={motionVariants}
            initial="enter"
            animate="show"
            exit="exit"
          >
            <Form ref={formRef} tabIndex={-1} onSubmit={handleSubmit(handleSentNote)}>
              <Header>
                <InputInline
                  error={errors.title}
                  className="note-title"
                  placeholder="Add a title"
                  autoComplete="off"
                  {...register('title')}
                />
              </Header>
              <NoteTextArea
                error={errors.note}
                aria-label="enter your note"
                {...register('note')}
              />
              <ButtonGroup>
                {dataToBeEdited.isInView && (
                  <Button
                    backgroundColor={pallet.alert}
                    type="submit"
                    aria-label="edit notes button"
                    isLoading={isSubmitting}
                  >
                    update
                  </Button>
                )}
                {!dataToBeEdited.isInView && (
                  <Button
                    backgroundColor={pallet.success}
                    type="submit"
                    aria-label="save notes button"
                    isLoading={isSubmitting}
                  >
                    Save
                  </Button>
                )}
                <Button
                  backgroundColor={pallet.error}
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

import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { api } from 'services';
import * as yup from 'yup';

import { Button, InputInline, NoteTextArea } from '@components/forms';
import { InputTag } from '@components/forms/input-tag';
import { useNotes } from '@contexts/notes-contexts';
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
  const { isNoteTextAreaVisible, cancelNewNote } = useNotes();
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(formNoteSchema),
  });

  const handleSentNote: SubmitHandler<FormData> = async (data) => {
    try {
      await api.post('/notes', data);
      cancelNewNote();
      toast.success('Saved successfully! ✅');
      reset({
        title: '',
        note: '',
      });
    } catch {
      toast.error('Sorry, an error happened', {
        closeOnClick: true,
      });
    }
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
            <Form onSubmit={handleSubmit(handleSentNote)} ref={formRef}>
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
                <Button
                  backgroundColor={theme.pallet.green[500]}
                  type="submit"
                  aria-label="save notes button"
                >
                  Save
                </Button>
                <Button
                  backgroundColor={theme.pallet.red[500]}
                  type="button"
                  aria-label="cancel notes button"
                  onClick={cancelNewNote}
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

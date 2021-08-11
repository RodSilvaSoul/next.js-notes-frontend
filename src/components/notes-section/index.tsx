import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, InputInline } from '@components/forms';
import { InputTag } from '@components/forms/input-tag';
import { useNotes } from '@contexts/notes-contexts';
import { yupResolver } from '@hookform/resolvers/yup';
import { theme } from '@styles/theme';

import notesImage from '../../../public/notes.png';
import { motionVariants } from './config';
import {
  Container,
  Header,
  NotesTextArea,
  Form,
  InnerContainer,
  AddNewNote,
  ButtonGroup,
} from './styles';

type FormData = {
  noteTitle: string;
  note: string;
};

const formNoteSchema = yup.object().shape({
  note: yup.string().required('Your must type a note'),
  noteTitle: yup.string().required('Your must type a note title'),
});

export const NotesSection = () => {
  const { isNoteTextAreaVisible, cancelNewNote } = useNotes();
  const [note, setNote] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formNoteSchema),
  });

  const handleSentNote: SubmitHandler<FormData> = async (data) => {
    console.log(data);
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
                  error={errors.noteTitle}
                  className="note-title"
                  placeholder="Add a title"
                  autoComplete="off"
                  {...register('noteTitle')}
                />
                <InputTag />
              </Header>
              <NotesTextArea
                aria-label="enter your note"
                {...register('note')}
                value={note}
                onChange={(event) => setNote(event.target.value)}
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

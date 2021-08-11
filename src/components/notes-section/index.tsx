import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FormEvent, useState } from 'react';

import { Button } from '@components/forms';
import { useNotes } from '@contexts/notes-contexts';
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
} from './styles';

export const NotesSection = () => {
  const { isNoteTextAreaVisible, cancelNewNote } = useNotes();
  const [note, setNote] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
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
            <Header>
              <h2>Note 1</h2>
              <input
                aria-label="add a tag"
                type="text"
                placeholder="add a tag"
              />
            </Header>
            <Form onSubmit={handleSubmit}>
              <NotesTextArea
                aria-label="enter your note"
                name="note"
                onChange={(event) => setNote(event.target.value)}
              />
              <div>
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
              </div>
            </Form>
          </InnerContainer>
        )}
      </AnimatePresence>
    </Container>
  );
};

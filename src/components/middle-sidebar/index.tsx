import { RiAddFill } from 'react-icons/ri';

import { IconButton, SearchInput } from '@components/forms';
import { useNotes } from '@contexts/notes-contexts';

import { Container, Header } from './styles';

export const MiddleSidebar = () => {
  const { addNewNote } = useNotes();

  return (
    <Container>
      <Header>
        <div>
          <h1>All notes</h1>
          <IconButton onClick={addNewNote} aria-label="add a new note">
            <RiAddFill />
          </IconButton>
        </div>
        <SearchInput
          aria-label="Search for notes"
          placeholder="Search for notes"
        />
      </Header>
    </Container>
  );
};

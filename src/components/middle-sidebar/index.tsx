import { RiAddFill } from 'react-icons/ri';
import { useQuery } from 'react-query';
import { api } from 'services';

import { CardNote } from '@components/card-note';
import { IconButton, SearchInput } from '@components/forms';
import { useNotes } from '@contexts/notes-contexts';

import { Container, Header } from './styles';

type DataResult = {
  id: number;
  title: string;
  note: string;
  createdAt: string;
};

export const MiddleSidebar = () => {
  const { addNewNote } = useNotes();

  const { data, isLoading, isSuccess } = useQuery<DataResult[]>(
    'notes',
    async () => {
      const result = await api.get('/notes');
      return result.data;
    },
  );

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
      {isLoading && <div>isLoading</div>}
      {isSuccess && (
        <NotesWrapper>
          {data?.map((note) => (
            <CardNote
              key={note.id}
              {...note}
              currentNodeOnClick={currentNode}
            />
          ))}
        </NotesWrapper>
      )}
    </Container>
  );
};

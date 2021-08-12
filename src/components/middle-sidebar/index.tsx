import { RiAddFill } from 'react-icons/ri';
import { useQuery } from 'react-query';
import { api } from 'services';

import { IconButton, SearchInput } from '@components/forms';
import { ThreeBallLoading } from '@components/progress';
import { useNotes } from '@contexts/notes-contexts';

import { NotesWrapper } from './notes-wrapper';
import { Container, Header, LoadingWrapper } from './styles';

type DataResult = {
  id: number;
  title: string;
  note: string;
  createdAt: string;
};

interface MiddleSidebarProps {
  currentPage: string;
}

export const MiddleSidebar = ({ currentPage }: MiddleSidebarProps) => {
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
          <h1>{currentPage}</h1>
          <IconButton onClick={addNewNote} aria-label="add a new note">
            <RiAddFill />
          </IconButton>
        </div>
        <SearchInput
          aria-label="Search for notes"
          placeholder="Search for notes"
        />
      </Header>
      {isLoading && (
        <LoadingWrapper>
          <ThreeBallLoading />
          <p>Loading ...</p>
        </LoadingWrapper>
      )}
      {isSuccess && (
        <NotesWrapper data={data} />
      )}
    </Container>
  );
};

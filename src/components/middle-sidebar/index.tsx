import Image from 'next/image';
import { RiAddFill } from 'react-icons/ri';

import { IconButton, SearchInput } from '@components/forms';
import { ThreeBallLoading } from '@components/progress';
import { useData } from '@contexts/application-data';
import { useUseCase } from '@contexts/application-useCases';

import ErrorImage from '../../../public/error.png';
import { NotesWrapper } from './notes-wrapper';
import {
  Container, Header, LoadingWrapper, ErrorWrapper,
} from './styles';

interface MiddleSidebarProps {
  currentPage: 'Trash' | 'Archived' | 'Notes'
}

export const MiddleSidebar = ({ currentPage }: MiddleSidebarProps) => {
  const {
    isError,
    isSuccess,
    isLoading,
    archivedNotes,
    trashNotes,
    notes,
  } = useData();

  const { addNewNote } = useUseCase();

  const data = {
    Notes: notes,
    Trash: trashNotes,
    Archived: archivedNotes,
  };

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
      {isError && (
        <ErrorWrapper>
          <Image
            height={100}
            width={100}
            src={ErrorImage}
            alt="error on load notes"
          />
          <p>Error loading notes</p>
        </ErrorWrapper>
      )}
      {isSuccess && (
        <NotesWrapper data={data[currentPage]} />
      )}
    </Container>
  );
};

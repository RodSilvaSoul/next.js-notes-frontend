import Image from 'next/image';
import { useRouter } from 'next/router';
import { RiAddFill } from 'react-icons/ri';

import { IconButton, SearchInput } from '@components/forms';
import { ThreeBallLoading } from '@components/progress';
import { useNotes } from '@contexts/notes-contexts';

import ErrorImage from '../../../public/error.png';
import { NotesWrapper } from './notes-wrapper';
import {
  Container, Header, LoadingWrapper, ErrorWrapper,
} from './styles';

interface MiddleSidebarProps {
  currentPage: string;
}

export const MiddleSidebar = ({ currentPage }: MiddleSidebarProps) => {
  const {
    addNewNote, isError, isSuccess, isLoading,
  } = useNotes();

  const { asPath, basePath, pathname } = useRouter();
  console.log(asPath, basePath, pathname);
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
    </Container>
  );
};

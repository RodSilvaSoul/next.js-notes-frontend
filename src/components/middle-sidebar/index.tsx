import Image from 'next/image';
import { memo, useMemo, useState } from 'react';
import { RiAddFill } from 'react-icons/ri';

import { IconButton, SearchInput } from '@components/forms';
import { ThreeBallLoading } from '@components/progress';
import { useUseCase } from '@contexts/application-useCases';
import { Note } from '@types';

import ErrorImage from '../../../public/error.png';
import { NotesWrapper } from './notes-wrapper';
import {
  Container,
  Header,
  LoadingWrapper,
  ErrorWrapper,
} from './styles';

interface MiddleSidebarProps {
  currentPage: 'Trash' | 'Archived' | 'Notes';
  data: Note[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
}

const MiddleSidebarBase = ({
  currentPage,
  isError,
  isLoading,
  isSuccess,
  data,
}: MiddleSidebarProps) => {
  const [searchValue, setSearchValue] = useState('');

  const { addNewNote, editNote } = useUseCase();

  const allData = useMemo(() => {
    const result = data.filter((noteData) => {
      if (searchValue) {
        if (noteData.title.toLocaleLowerCase().includes(searchValue)) {
          return true;
        }
        return false;
      }
      return true;
    });
    return result;
  }, [data, searchValue]);

  function handleAddButton() {
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
      <Header>
        <div>
          <h1>{currentPage}</h1>
          <IconButton onClick={handleAddButton} aria-label="add a new note">
            <RiAddFill />
          </IconButton>
        </div>
        <SearchInput
          aria-label="Search for notes"
          placeholder="Search for notes"
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value.toLowerCase())}
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
      {isSuccess && <NotesWrapper data={allData} />}
    </Container>
  );
};

export const MiddleSidebar = memo(MiddleSidebarBase);

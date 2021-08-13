import Image from 'next/image';
import { useMemo, useState } from 'react';
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
  const [searchValue, setSearchValue] = useState('');

  const {
    isError,
    isSuccess,
    isLoading,
    archivedNotes,
    trashNotes,
    notes,
  } = useData();

  const { addNewNote, editNote } = useUseCase();

  const data = useMemo(() => {
    const allData = {
      Notes: notes,
      Trash: trashNotes,
      Archived: archivedNotes,
    };

    const result = allData[currentPage].filter((noteData) => {
      if (searchValue) {
        if (noteData.title.includes(searchValue)) {
          return true;
        }
        return false;
      }
      return true;
    });
    return result;
  }, [archivedNotes, currentPage, notes, searchValue, trashNotes]);

  function handleAddButton () {
    editNote({
      id: 0,
      isInView: false,
      note: '',
      title: '',
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
          onChange={(event) => setSearchValue(event.currentTarget.value)}
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
      {isSuccess && <NotesWrapper data={data} />}
    </Container>
  );
};

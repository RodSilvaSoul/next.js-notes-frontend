import { RiAddFill } from 'react-icons/ri';

import { Button, SearchInput } from '@components/forms';

import { Container, Header } from './styles';

export const MiddleSidebar = () => (
  <Container>
    <Header>
      <div>
        <h1>All notes</h1>
        <Button aria-label="add a new note">
          <RiAddFill />
        </Button>
      </div>
      <SearchInput
        aria-label="Search for notes"
        placeholder="Search for notes"
      />
    </Header>
  </Container>
);

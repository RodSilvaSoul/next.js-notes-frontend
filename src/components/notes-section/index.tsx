import { Button } from '@components/forms';

import {
  Container, Header, NotesTextArea, Form,
} from './styles';

export const NotesSection = () => (
  <Container>
    <Header>
      <h2>Note 1</h2>
      <input aria-label="add a tag" type="text" placeholder="add a tag" />
    </Header>
    <Form>
      <NotesTextArea aria-label="enter your note" />
      <div>
        <Button type="submit" aria-label="save notes button">
          Save
        </Button>
      </div>
    </Form>
  </Container>
);

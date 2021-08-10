import { Container, Header, NotesTextArea } from './styles';

export const NotesSection = () => (
  <Container>
    <Header>
      <h2>Note 1</h2>
      <input aria-label="add a tag" type="text" placeholder="add a tag" />
    </Header>
    <NotesTextArea aria-label="enter your note" />
  </Container>
);

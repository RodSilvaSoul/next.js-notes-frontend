import { useState, useEffect } from 'react';

import { CardNote } from '@components/card-note';
import { Note } from '@types';

import { Container } from './styles';

interface NotesWrapperProps {
  data: Note[] | undefined;
}

export const NotesWrapper = ({ data }: NotesWrapperProps) => {
  const [currentNode, setCurrentNode] = useState<Node | null>(null);

  useEffect(() => {
    document.addEventListener(
      'click',
      (event) => {
        setCurrentNode(event.target as any);
      },
      true,
    );
  }, []);

  return (
    <Container>
      {data?.map((note) => (
        <CardNote key={note.id} {...note} currentNodeOnClick={currentNode} />
      ))}
    </Container>
  );
};

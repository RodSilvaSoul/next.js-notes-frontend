import { useState, useEffect } from 'react';

import { CardNote } from '@components/card-note';

import { Container } from './styles';

type DataResult = {
  id: number;
  title: string;
  note: string;
  createdAt: string;
};

interface NotesWrapperProps {
  data: DataResult[] | undefined;
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

import { IconButton } from 'components/forms';
import Link from 'next/link';
import { RiAddFill } from 'react-icons/ri';

import { useData } from '@contexts/application-data';

import {
  Body, Container, Head, SidebarButton,
} from './styles';

export const Sidebar = () => {
  const { notes, trashNotes, archivedNotes } = useData();

  return (
    <Container>
      <Head>
        <h1>Views </h1>
        <IconButton aria-label="add a new view">
          <RiAddFill />
        </IconButton>
      </Head>
      <Body>
        <SidebarButton>
          <Link href="/" passHref>
            <a>
              All notes
              <span>{notes?.length}</span>
            </a>
          </Link>
        </SidebarButton>
        <SidebarButton>
          <Link href="/archived" passHref>
            <a>
              Archived
              <span>{archivedNotes?.length}</span>
            </a>
          </Link>
        </SidebarButton>
        <SidebarButton>
          <Link href="/trash" passHref>
            <a>
              Trash
              <span>{trashNotes?.length}</span>
            </a>
          </Link>
        </SidebarButton>
      </Body>
    </Container>
  );
};

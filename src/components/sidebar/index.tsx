import { IconButton } from 'components/forms';
import Link from 'next/link';
import { memo } from 'react';
import { RiAddFill } from 'react-icons/ri';

import {
  Body, Container, Head, SidebarButton,
} from './styles';

interface SidebarProps {
  trashCount: number | undefined;
  archivedCount: number | undefined;
  notesCount: number | undefined;
}

const SidebarBase = ({
  archivedCount,
  notesCount,
  trashCount,
}: SidebarProps) => (
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
            <span>{notesCount ?? 0}</span>
          </a>
        </Link>
      </SidebarButton>
      <SidebarButton>
        <Link href="/archived" passHref>
          <a>
            Archived
            <span>{archivedCount ?? 0}</span>
          </a>
        </Link>
      </SidebarButton>
      <SidebarButton>
        <Link href="/trash" passHref>
          <a>
            Trash
            <span>{trashCount ?? 0}</span>
          </a>
        </Link>
      </SidebarButton>
    </Body>
  </Container>
);

export const Sidebar = memo(SidebarBase);

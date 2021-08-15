import { IconButton } from 'components/forms';
import Link from 'next/link';
import { memo, useContext } from 'react';
import { BsMoon } from 'react-icons/bs';
import { FaSun } from 'react-icons/fa';
import { ThemeContext } from 'styled-components';

import { useThemeController } from '@contexts/theme-controller';

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
}: SidebarProps) => {
  const { title } = useContext(ThemeContext);
  const { toggleTheme } = useThemeController();
  return (
    <Container>
      <Head>
        <h1>Views </h1>
        <IconButton aria-label="add a new view" onClick={toggleTheme}>
          {title === 'dark' ? <BsMoon /> : <FaSun />}
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
};

export const Sidebar = memo(SidebarBase);

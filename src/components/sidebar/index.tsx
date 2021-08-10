import { Button } from 'components/forms';
import Link from 'next/link';
import { RiAddFill } from 'react-icons/ri';

import {
  Body, Container, Head, SidebarButton,
} from './styles';

export const Sidebar = () => (
  <Container>
    <Head>
      <h1>Views </h1>
      <Button aria-label="add a new view">
        <RiAddFill />
      </Button>
    </Head>
    <Body>
      <SidebarButton>
        <Link href="/all-notes" passHref>
          <a>
            All notes
            <span>1</span>
          </a>
        </Link>
      </SidebarButton>
      <SidebarButton>
        <Link href="/archived" passHref>
          <a>
            Archived
            <span>12</span>
          </a>
        </Link>
      </SidebarButton>
      <SidebarButton>
        <Link href="/trash" passHref>
          <a>
            Trash
            <span>1</span>
          </a>
        </Link>
      </SidebarButton>
    </Body>
  </Container>
);

import Head from 'next/head';

import { Sidebar, MiddleSidebar, NotesSection } from '@components/index';
import { Container } from '@styles/pages';

export default function Trash() {
  return (
    <>
      <Head>
        <title>Trash</title>
      </Head>
      <Container>
        <Sidebar />
        <MiddleSidebar currentPage="All notes" />
        <NotesSection />
      </Container>
    </>
  );
}

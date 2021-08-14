import Head from 'next/head';

import { Sidebar, MiddleSidebar, NotesSection } from '@components/index';
import { Container } from '@styles/pages';

export default function Trash() {
  return (
    <>
      <Head>
        <title>Simple notes | Trash</title>
      </Head>
      <Container>
        <Sidebar />
        <MiddleSidebar currentPage="Trash" />
        <NotesSection />
      </Container>
    </>
  );
}

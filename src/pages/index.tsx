import Head from 'next/head';

import { Sidebar, MiddleSidebar, NotesSection } from '@components/index';
import { Container } from '@styles/pages';

export default function Home() {
  return (
    <>
      <Head>
        <title>Simple notes</title>
      </Head>
      <Container>
        <Sidebar />
        <MiddleSidebar />
        <NotesSection />
      </Container>
    </>
  );
}

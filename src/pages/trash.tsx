import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { useQuery } from 'react-query';
import { api } from 'services';

import { Sidebar, MiddleSidebar, NotesSection } from '@components/index';
import { Container } from '@styles/pages';
import { Note } from '@types';
import { filterData } from '@util/data-helpers';

export default function Home() {
  const {
    data, isLoading, isSuccess, isError,
  } = useQuery<Note[]>(
    'notes',
    async () => {
      const resp = await api.get('/notes');

      return resp.data;
    },
  );

  const dataFiltered = filterData(data ?? []);

  const trashCount = dataFiltered.trash.length;
  const archivedCount = dataFiltered.archived.length;
  const notesCount = dataFiltered.notes.length;

  return (
    <>
      <Head>
        <title>Simple notes | Notes</title>
      </Head>
      <Container>
        <Sidebar
          archivedCount={archivedCount}
          notesCount={notesCount}
          trashCount={trashCount}
        />
        <MiddleSidebar
          isError={isError}
          isLoading={isLoading}
          isSuccess={isSuccess}
          data={dataFiltered.trash}
          currentPage="Trash"
        />
        <NotesSection />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { theme } = parseCookies(ctx);

  return {
    props: {
      theme,
    },
  };
};

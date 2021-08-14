import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/types/hydration';
import { api } from 'services';

import { Sidebar, MiddleSidebar, NotesSection } from '@components/index';
import { Container } from '@styles/pages';
import { filterData, FilteredData } from '@util/filter-data';

export default function Home() {
  const { data } = useQuery<FilteredData>('notes', async () => {
    const resp = await api.get('/notes');
    const result = filterData(resp.data);

    return result;
  });

  return (
    <>
      <Head>
        <title>Simple notes | Notes</title>
      </Head>
      <Container>
        <Sidebar />
        <MiddleSidebar currentPage="Notes" />
        <NotesSection />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('notes', async () => {
    const resp = await api.get('/notes');

    const result = filterData(resp.data);

    return result;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

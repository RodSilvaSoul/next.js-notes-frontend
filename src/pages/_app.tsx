import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';

import { NotesProvider } from '@contexts/notes-contexts';
import { GlobalStyles } from '@styles/global';
import { theme } from '@styles/theme';

import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={new QueryClient()}>
        <NotesProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </NotesProvider>
      </QueryClientProvider>

      <GlobalStyles />
    </ThemeProvider>
  );
}
export default MyApp;

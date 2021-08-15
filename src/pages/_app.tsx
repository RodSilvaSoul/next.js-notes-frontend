import type { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import { queryClient } from 'services';
import { makeServer } from 'services/make-server';
import { ThemeProvider } from 'styled-components';

import { ApplicationUseCaseProvider } from '@contexts/index';
import { GlobalStyles } from '@styles/global';
import { theme } from '@styles/theme';

import 'react-toastify/dist/ReactToastify.css';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ApplicationUseCaseProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </ApplicationUseCaseProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
      <GlobalStyles />
    </ThemeProvider>
  );
}
export default MyApp;

import type { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import { ToastContainer } from 'react-toastify';
import { queryClient } from 'services';
import { ThemeProvider } from 'styled-components';

import {
  ApplicationDataProvider,
  ApplicationUseCaseProvider,
} from '@contexts/index';
import { GlobalStyles } from '@styles/global';
import { theme } from '@styles/theme';

import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ApplicationDataProvider>
            <ApplicationUseCaseProvider>
              <Component {...pageProps} />
              <ToastContainer />
            </ApplicationUseCaseProvider>
          </ApplicationDataProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>

      <GlobalStyles />
    </ThemeProvider>
  );
}
export default MyApp;

import type { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import { queryClient } from 'services';
import { ThemeProvider } from 'styled-components';

import { ApplicationUseCaseProvider } from '@contexts/index';
import { GlobalStyles } from '@styles/global';
import { themeDark } from '@styles/theme-dark';

import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={themeDark}>
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

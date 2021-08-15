import type { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import { queryClient } from 'services';

import { ApplicationUseCaseProvider } from '@contexts/index';
import { ThemeControllerProvider } from '@contexts/theme-controller';
import { GlobalStyles } from '@styles/global';
import { themeDark } from '@styles/theme-dark';

import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeControllerProvider
        themePersisted={pageProps.theme}
        DefaultTheme={themeDark}
      >
        <ApplicationUseCaseProvider>
          <Component {...pageProps} />
          <ToastContainer />
          <GlobalStyles />
        </ApplicationUseCaseProvider>
      </ThemeControllerProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
export default MyApp;

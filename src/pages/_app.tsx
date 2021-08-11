import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { NotesProvider } from '@contexts/notes-contexts';
import { GlobalStyles } from '@styles/global';
import { theme } from '@styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <NotesProvider>
        <Component {...pageProps} />
      </NotesProvider>
      <GlobalStyles />
    </ThemeProvider>
  );
}
export default MyApp;

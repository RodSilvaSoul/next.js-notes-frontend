import { setCookie } from 'nookies';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ThemeProvider } from 'styled-components';

import { themeDark } from '@styles/theme-dark';
import { themeLight } from '@styles/theme-light';

interface ThemeControllerData {
  toggleTheme: () => void;
}

const ThemeControllerContext = createContext<ThemeControllerData>({} as any);

type ThemeType = typeof themeDark;

interface ThemeControllerProviderProps {
  children: ReactNode;
  themePersisted: string;
  DefaultTheme: ThemeType;
}

export const ThemeControllerProvider = ({
  children,
  themePersisted,
  DefaultTheme,
}: ThemeControllerProviderProps) => {
  const [themeData, setThemeData] = useState<ThemeType>(() => {
    if (themePersisted) {
      try {
        const data = JSON.parse(themePersisted);
        return data;
      } catch {
        return DefaultTheme;
      }
    }
    return DefaultTheme;
  });

  useEffect(() => {
    setCookie(null, 'theme', JSON.stringify(themeData));
  }, [themeData]);

  const toggleTheme = useCallback(() => {
    setThemeData(themeData.title === 'dark' ? themeLight : themeDark);
  }, [themeData]);

  return (
    <ThemeControllerContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={themeData}>{children}</ThemeProvider>
    </ThemeControllerContext.Provider>
  );
};

export const useThemeController = () => useContext(ThemeControllerContext);

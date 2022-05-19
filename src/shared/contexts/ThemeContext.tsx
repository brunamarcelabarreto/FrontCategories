import { createContext, useCallback, useMemo, useState } from 'react';
import { ThemeProvider } from "@emotion/react";

import { DarkTheme, LightTheme } from "./../themes";


interface ThemeContextDataProps {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
  children?: string;
}


const ThemeContext = createContext({} as ThemeContextDataProps);

export const AppThemeProvider = ({ children }: ThemeContextDataProps) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
  }, []);

  const theme = useMemo(() => {
    if (themeName === 'light') return LightTheme; 

    return DarkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={DarkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
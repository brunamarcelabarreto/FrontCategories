/* eslint-disable react/react-in-jsx-scope */
import { useCallback, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material';

import { DarkTheme, LightTheme } from './../themes';
import { Box } from '@mui/system';
import { ThemeContext } from './UseContext';


interface ThemeContextDataProps {
  children: React.ReactNode
}

// eslint-disable-next-line react/prop-types
export const AppThemeProvider: React.FC<ThemeContextDataProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
  }, []);

  const theme = useMemo(() => {
    if (themeName === 'light') return LightTheme; 

    return DarkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName: themeName, toggleTheme: toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
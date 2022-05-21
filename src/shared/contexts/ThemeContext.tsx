/* eslint-disable react/react-in-jsx-scope */
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material';

import { DarkTheme, LightTheme } from './../themes';
import { Box } from '@mui/system';
import { ThemeContext } from './UseContext';


// interface ThemeContextData {
//   themeName: 'light' | 'dark';
//   toggleTheme: () => void;
// }

interface ThemeContextDataProps {
  children: React.ReactNode
}



// const ThemeContext = createContext({} as ThemeContextData);

// export const useAppThemeContext = () => {
//   return useContext(ThemeContext);
// }

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
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ThemeProvider } from "@mui/material";

import { DarkTheme, LightTheme } from "./../themes";
import { Box } from '@mui/system';


interface ThemeContextDataProps {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
  children: React.ReactNode;
}




const ThemeContext = createContext({} as ThemeContextDataProps);

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
}

export const AppThemeProvider: React.FC<ThemeContextDataProps> = ({ themeName, toggleTheme, children }) => {
  const [themeNames, setThemeNames] = useState<'light' | 'dark'>('light');

  const toggle = useCallback(() => {
    setThemeNames(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
  }, []);

  const theme = useMemo(() => {
    if (themeNames === 'light') return LightTheme; 

    return DarkTheme;
  }, [themeNames]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme, children }}>
      <ThemeProvider theme={theme}>
        <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
        {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
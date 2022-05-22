import { createContext, useContext } from 'react';


interface ThemeContextDataProps {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
}


export const ThemeContext = createContext({} as ThemeContextDataProps);

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};
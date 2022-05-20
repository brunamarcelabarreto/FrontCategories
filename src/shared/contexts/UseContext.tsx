import { createContext, useContext } from "react";


interface ThemeContextData {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
}


export const ThemeContext = createContext({} as ThemeContextData);

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
}
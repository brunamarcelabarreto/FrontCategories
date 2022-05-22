import { createContext, useContext } from 'react';


interface DrawerContextDataProps {
  toggleDrawerOpen: () => void;
  isDrawerOpen: boolean;
}


export const DrawerContext = createContext({} as DrawerContextDataProps);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};
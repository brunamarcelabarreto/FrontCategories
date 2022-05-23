/* eslint-disable react/react-in-jsx-scope */
import {  createContext, useCallback, useContext, useState } from 'react';


interface DrawerOptionProps {
  icon: string;
  path: string;
  label: string;
}
interface DrawerContextDataProps {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  drawerOptions: DrawerOptionProps[];
  setDrawerOptions: (newDrawerOptions: DrawerOptionProps[]) => void;
}

interface DrawerContextProps {
  children: React.ReactNode;
}

export const DrawerContext = createContext({} as DrawerContextDataProps);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};
// eslint-disable-next-line react/prop-types
export const DrawerProvider: React.FC<DrawerContextProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerOptions, setDrawerOptions] = useState<DrawerOptionProps[]>([]);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  const handleSetDrawerOptions = useCallback((newDrawerOptions: DrawerOptionProps[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions }}>
      {children}
    </DrawerContext.Provider>
  );
};
/* eslint-disable react/react-in-jsx-scope */
import {  useCallback, useState } from 'react';
import { DrawerContext } from './UseDrawerContext';



interface DrawerContextDataProps {
  children: React.ReactNode;
}

// eslint-disable-next-line react/prop-types
export const DrawerProvider: React.FC<DrawerContextDataProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);


  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts/DrawerContext';

export const AppRoutes = () => {
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { 
        icon: 'home',
        path: '/home',
        label: 'Home',
      }
    ]);
  }, []);


  return (
    <Routes>
      <Route path="/home" element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Home</Button>}/>

      <Route path="*" element= {<Navigate to="/home" />} />
    </Routes>
  );
};


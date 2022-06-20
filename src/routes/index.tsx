import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts/DrawerContext';
import { 
  Dashboard,
  CategoryListing,
  CategoryEdition,
} from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { 
        icon: 'home',
        path: '/home',
        label: 'Home',
      },
      { 
        //icon: 'shopping_bag',
        icon: 'signpost',
        path: '/categories',
        label: 'Categorias',
      }
    ]);
  }, []);


  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />
      
      <Route path="/categories" element={<CategoryListing />} />
      <Route path="/categories/detail/:id" element={<CategoryEdition />} />

      <Route path="*" element= {<Navigate to="/home" />} />
    </Routes>
  );
};


import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts/DrawerContext';
import { 
  Dashboard,
  CategoryListing,
  CategoryEdition,
  ProductListing,
  ProductEdition,
  ProductsByCategory,
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
        icon: 'signpost',
        path: '/categories',
        label: 'Categorias',
      },
      {
        icon: 'shopping_bag',
        path: '/products',
        label: 'Produtos',
      }
    ]);
  }, []);


  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />
      <Route path="/categories" element={<CategoryListing />} />
      <Route path="/categories/detail/:id" element={<CategoryEdition />} />
      <Route path="/category/detail/:id" element={<ProductsByCategory />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/products/detail/:id" element={<ProductEdition />} />
      <Route path="*" element= {<Navigate to="/home" />} />
    </Routes>
    

  );
};


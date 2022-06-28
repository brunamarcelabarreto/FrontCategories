import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductsService } from '../../shared/services/api/products/ProductsService';

import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { BasePageLayout } from '../../shared/layouts';
import { DetailTool, ListingTool } from '../../shared/components';


interface ProductListingProps {
  id: number;
  name: string;
  code: number;
  quantity: number;
  is_active: boolean;
  categoryId: number;
}

export const ProductsByCategory= () => {
  const { id } = useParams<'id'>();
  const [isLoading, setIsLoading] = useState(false);
  const [resultByCategory, setResultByCategory] = useState<ProductListingProps[]>([]);
  const [searchParams, setSearchParams] = useState('');
  const navigate = useNavigate();
  
  const search = useMemo(() => {
    if (!searchParams) return resultByCategory;
    return resultByCategory.filter((products) => {
      return products.name.toLowerCase().includes(searchParams.toLowerCase());
    });
  }, [searchParams, resultByCategory]);

  useEffect(() => {
    ProductsService.getByCategoryId(Number(id))
      .then((resultByCategory) => {
        console.log(resultByCategory);
        if (resultByCategory instanceof Error) {
          alert(resultByCategory.message);
        } else {
          setResultByCategory(resultByCategory.data);
          setIsLoading(false);
        }
      });
  }, []);

  return (
    <BasePageLayout
      title="Produtos"
      toolBar={
        <ListingTool
          showSearchInput
          newButtonText='Novo'
          textSearch={searchParams}
          switchTextSearch={text => setSearchParams(text)}
          onClickInNewButton={() => navigate('/products/detail/novo')}
        />
      }
    >
      <TableContainer component={Paper} variant="outlined" sx={{ margin: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Código</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Ativo</TableCell>
              <TableCell>Id da Categoria</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {search.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.is_active?'Ativo':'inativo'}</TableCell>
                <TableCell>{row.categoryId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell colSpan={3}>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </ BasePageLayout>
  );
}; 


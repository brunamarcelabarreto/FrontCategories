import { Icon, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListingTool } from '../../shared/components';
import { BasePageLayout } from '../../shared/layouts';
import { ProductsService } from '../../shared/services/api/products/ProductsService';

interface ProductListingProps {
  id: number;
  name: string;
  code: string;
  quantity: number;
  is_active: boolean;
  categoryId: number;
}

export const ProductListing = () => {
  const [result, setResult] = useState<ProductListingProps[]>([]);
  const [searchParams, setSearchParams] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const search = useMemo(() => {
    if (!searchParams) return result;
    return result.filter((product) => {
      return product.name.toLowerCase().includes(searchParams.toLowerCase());
    });
  }, [searchParams, result]);

  useEffect(() => {
    ProductsService.getAll()
      .then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setResult(result.data);
          setIsLoading(false);
        }
      });
  }, []);

  
  const handleDelete = (id: number) => {
    if (confirm('Deseja excluir?')) {
      ProductsService.deleteById(id)
        .then((result) =>{
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setResult(oldRows => [
              ...oldRows.filter(((oldRow: { id: number; }) => oldRow.id !== id),
              )]);
          }
          alert('Registro deletado com sucesso!');
        }
        );
    }
  };

  return (
    <BasePageLayout
      title="Produtos"
      toolBar={
        <ListingTool
          showSearchInput
          newButtonText='Novo '
          onClickInNewButton={() => navigate('/products/detail/novo')}
          textSearch={searchParams}
          switchTextSearch={text => setSearchParams(text)}
        />
      }
    >
      <TableContainer component={Paper} variant="outlined" sx={{ margin: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Código</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Ativo</TableCell>
              <TableCell>Id da Categoria</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {search.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/products/detail/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.id}</TableCell>
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
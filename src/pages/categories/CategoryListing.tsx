import { Icon, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListingTool } from '../../shared/components';
import { BasePageLayout } from '../../shared/layouts';
import { CategoriesService } from '../../shared/services/api/categories/CategoriesService';

interface CategoryListingProps {
  name: string;
  id: number;
}

export const CategoryListing = () => {
  const [result, setResult] = useState<CategoryListingProps[]>([]);
  const [searchParams, setSearchParams] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const search = useMemo(() => {
    if (!searchParams) return result;
    return result.filter((category) => {
      return category.name.toLowerCase().includes(searchParams.toLowerCase());
    });
  }, [searchParams, result]);

  useEffect(() => {
    CategoriesService.getAll()
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
      CategoriesService.deleteById(id)
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
      title="Categorias"
      toolBar={
        <ListingTool
          showSearchInput
          newButtonText='Nova'
          onClickInNewButton={() => navigate('/categories/detail/nova')}
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
            </TableRow>
          </TableHead>
          <TableBody>
            {search.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/categories/detail/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.id}</TableCell>
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
import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { ListingTool } from '../../shared/components';
// import { useDebounce } from '../../shared/hooks';
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
  // const { debounce } = useDebounce(300, false);

  const search = useMemo(() => {
    if (!searchParams) return result;
    return result.filter((category) => {
      return category.name.toLowerCase().includes(searchParams.toLowerCase());
    });
  }, [searchParams, result]);

  useEffect(() => {
    setIsLoading(true);
    // debounce(() => {
    CategoriesService.getAll()
      .then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setResult(result.data);
          setIsLoading(false);
        }
      });
    // });
  }, []);

  return (
    <BasePageLayout 
      title="Categorias"
      toolBar={
        <ListingTool  
          showSearchInput
          newButtonText='Novo'
          textSearch={searchParams}
          switchTextSearch={text => setSearchParams(text)}
        />
      }
    >
      <TableContainer component={Paper} variant="outlined" sx={{ margin: 1, width: 'auto'}}>
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
                <TableCell>Ações</TableCell>
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
          </TableFooter>
        </Table>
      </TableContainer>
    </ BasePageLayout>
  );

};


import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import React from 'react';
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
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const search = useMemo(() => {
    if (!searchParams) return result;
    return result.filter((category) => {
      return category.name.toLowerCase().includes(searchParams.toLowerCase());
    });
  }, [searchParams, result]);

  useEffect(() => {
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

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
            <TableRow>
              <TableCell colSpan={3}>
                <TablePagination
                  component="div"
                  count={100}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />

              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </ BasePageLayout>
  );
};
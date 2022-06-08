import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { ListingTool } from '../../shared/components';
// import { useDebounce } from '../../shared/hooks';
import { BasePageLayout } from '../../shared/layouts';
import { CategoriesService, CategoryListProps } from '../../shared/services/api/categories/CategoriesService';


interface CategoryListingProps {
  name: string;
  id: number;
}

export const CategoryListing = () => {
  const [searchParams, setSearchParams] = useState('');
  const [result, setResult] = useState<CategoryListingProps[]>([]);
  console.log(result);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // const { debounce }= useDebounce(300, false);
  const filtered = result.map(({name}) => name);
  console.log(filtered);
  const search = useMemo(() => { 
    const lowerSearch = searchParams.toLowerCase();
    return filtered.filter((name) => name.toLowerCase().includes(lowerSearch));
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    // debounce(() => {
    CategoriesService.getAll()
      .then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setResult(result.data);
          setTotalCount(result.totalCount);
        }
      });
    // });
  }, []);
  console.log(search);

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
            {filtered.map(row => (
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



      {/* <ul>
        {search.map((name) => (
          <li key={name}>
            {name}
          </li>
        ))}
      </ul> */}
    </ BasePageLayout>
  );

};

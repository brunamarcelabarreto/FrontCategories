
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { DonutChart, ListingTool } from '../../shared/components';
import { BasePageLayout } from '../../shared/layouts';
import { CategoriesService } from '../../shared/services/api/categories/CategoriesService';
import { ProductsService } from '../../shared/services/api/products/ProductsService';
import { data, options } from './data';

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [countCategory, setCountCategory] = useState();
  const [countProduct, setCountProduct] = useState();

  useEffect(() => {
    setIsLoading(true);

    CategoriesService.countAll()
      .then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setCountCategory(result);
        }
      });
    ProductsService.countAll()
      .then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setCountProduct(result);
        }
      });
  }, []);

  return (
    <BasePageLayout title='Dashboard' toolBar={<ListingTool showNewButton={false} />}>
      <Box width='100%' display='flex'>
        <Grid container margin={1}> 
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent >
                  <Box padding={0} width='100%' display='flex' justifyContent='center'>
                    <DonutChart 
                      chartType="PieChart"
                      chartArea={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#f4f4f4'
                      }}
                      data={data}
                      options={options}
                      width="330px"
                      height="240px" 
                      backgroundColor='#f4f4f4' />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de Categorias
                  </Typography>
                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h1'>
                      {countCategory}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de Produtos
                  </Typography>
                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h1'>
                      {countProduct}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

      </Box>
     
    </BasePageLayout>
  );
};


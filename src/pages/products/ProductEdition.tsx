import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, LinearProgress, Paper } from '@mui/material';
import * as yup from 'yup';

import { DetailTool } from '../../shared/components';
import { BasePageLayout } from '../../shared/layouts';
import { UTextField, UForm, useUForm, UFormErrorsProps } from '../../shared/forms';
import { ProductsService } from '../../shared/services/api/products/ProductsService';

interface FormDataProps {
  id: number;
  name: string;
  code: string;
  quantity: number;
  is_active: boolean;
  categoryId: number;
}

const formValidationSchema: yup.SchemaOf<FormDataProps> = yup.object().shape({
  id: yup.number().default(Number),
  name: yup.string().required().min(3),
  code: yup.string().required(),
  quantity: yup.number().required().min(1),
  is_active: yup.boolean().required(),
  categoryId: yup.number().required(),
});

export const ProductEdition: React.FC = () => {
  const { id = 'novo' } = useParams<'id'>();
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose: isSaveAndClose } = useUForm();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if(id !== 'novo') {
      setIsLoading(true);
      const productId = Number(id);
      ProductsService.getById(productId)
        .then((result) => {
          setIsLoading(false);
          if(result instanceof Error) {
            alert(result.message);
            navigate('/products');
          } else {
            setName(result.name);
            console.log(result);
            formRef.current?.setData(result);
          }
        });
    } else {
      formRef.current?.setData({
        name: '',
      });
    }
  }, [id]);

  const handleSave = (data: FormDataProps) => {

    formValidationSchema.
      validate(data, { abortEarly: false })
      .then((validatedData) => {
        setIsLoading(true);

        if (id === 'novo') {
          ProductsService
            .create(validatedData)
            .then((result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/products');
                } else {
                  navigate(`/products/detail/${result}`);
                }
              }
            });
        } else {
          const productId = Number(id);
          ProductsService
            .updateById(productId, validatedData)
            .then((result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/products');
                }
              }
            });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: UFormErrorsProps =  {};
        errors.inner.forEach(error => {
          if (!error.path) return;
          validationErrors[error.path] = error.message;
        });
        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleDelete = (id: number) => {
    if (confirm('Deseja excluir?')) {
      ProductsService.deleteById(id)
        .then((result) =>{
          if (result instanceof Error) {
            alert(result.message);
          } else {
            navigate('/products');
          }
          alert('Registro deletado com sucesso!');
        }
        );
    }
  };

  return (
    <BasePageLayout 
      title={id === 'novo' ? 'Novo Produto' : name}
      toolBar={
        <DetailTool 
          newButtonText='Novo'
          showButtonSaveAndClose
          showButtonNew={id !== 'novo'} 
          showButtonDelete={id !== 'novo'} 

          onClickInSave={save}
          onClickInReturn={() => navigate('/products')}
          onClickInDelete={() => handleDelete(Number(id))}
          onClickInNew={() => navigate('/products/detail/novo')}
          onClickInSaveAndClose={saveAndClose}
        />
      }
    > 
      <UForm ref={formRef} onSubmit={handleSave} >
        <Box margin={1} display="flex" flex-direction="column" component={Paper} variant="outlined">
          <Grid container direction="column" padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <UTextField fullWidth name='name' label='Nome' disabled={isLoading} onChange={e => setName(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <UTextField fullWidth name='code' label='Código' disabled={isLoading} onChange={e => setName(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <UTextField fullWidth name='quantity' label='Quantidade' disabled={isLoading} onChange={e => setName(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <UTextField fullWidth name='is_active' label='Ativo' disabled={isLoading} onChange={e => setName(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <UTextField fullWidth name='categoryId' label='Id da Categoria' disabled={isLoading} onChange={e => setName(e.target.value)}
                />
              </Grid>
            </Grid>  
            
          </Grid>
        </Box>

      </UForm>
    </BasePageLayout>
  );
}; 


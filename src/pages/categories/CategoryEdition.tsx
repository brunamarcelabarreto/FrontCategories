import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DetailTool } from '../../shared/components';
import { BasePageLayout } from '../../shared/layouts';
import { CategoriesService } from '../../shared/services/api/categories/CategoriesService';
import { Form } from '@unform/web';
import { UTextField } from '../../shared/forms';
import { FormHandles } from '@unform/core';
import { Box, Grid, LinearProgress, Paper } from '@mui/material';


interface FormDataProps {
  id: number;
  name: string;
}

export const CategoryEdition: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null); 

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');


  useEffect(() => {
    if(id !== 'nova') {
      setIsLoading(true);
      const idCategory = Number(id);
      CategoriesService.getById(idCategory)
        .then((result) => {
          setIsLoading(false);

          if(result instanceof Error) {
            alert(result.message);
            navigate('/categories');
          } else {
            setName(result.name);
            console.log(result);

            formRef.current?.setData(result);
          }
        });
    }
  }, [id]);

  const handleSave = (data: FormDataProps) => {
    setIsLoading(true);
    console.log('create', data);
    
    if (id === 'nova') {
      CategoriesService
        .create(data)
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          } else {
            navigate(`/categories/detail/${result}`);
          }
        });

    } else {
      const idCategory = Number(id);
      CategoriesService
        .updateById(idCategory, data)
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          } else {
            navigate('/categories');
            console.log('result', result);
          }
        });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Deseja excluir?')) {
      CategoriesService.deleteById(id)
        .then((result) =>{
          if (result instanceof Error) {
            alert(result.message);
          } else {
            navigate('/categories');
          }
          alert('Registro deletado com sucesso!');
        }
        );
    }
  };

  return (
    <BasePageLayout 
      title={id === 'nova' ? 'Nova Categoria' : name}
      toolBar={
        <DetailTool 
          newButtonText='Nova'
          showButtonSaveAndReturn
          showButtonNew={id !== 'nova'} 
          showButtonDelete={id !== 'nova'} 

          onClickInBack={() => navigate('/categories')}
          onClickInDelete={() => handleDelete(Number(id))}
          onClickInSave={() => formRef.current?.submitForm()}
          onClickInNew={() => navigate('/categories/detail/nova')}
          onClickInSaveAndReturn={() => formRef.current?.submitForm()}
        />
      }
    > 
      <Form ref={formRef} onSubmit={handleSave} >
        <Box margin={1} display="flex" flex-direction="column" component={Paper} variant="outlined">
          <Grid container direction="column" padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <UTextField
                  fullWidth
                  name='name'
                  label='Nome' 
                  disabled={isLoading} 
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>

      </Form>
    </BasePageLayout>
  );
};


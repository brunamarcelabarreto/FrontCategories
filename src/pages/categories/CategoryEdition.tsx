import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, LinearProgress, Paper } from '@mui/material';

import { DetailTool } from '../../shared/components';
import { BasePageLayout } from '../../shared/layouts';
import { UTextField, UForm, useUForm } from '../../shared/forms';
import { CategoriesService } from '../../shared/services/api/categories/CategoriesService';

interface FormDataProps {
  id: number;
  name: string;
}

export const CategoryEdition: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose: isSaveAndClose } = useUForm();

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
    } else {
      formRef.current?.setData({
        name: '',
      });
    }
  }, [id]);

  const handleSave = (data: FormDataProps) => {
    setIsLoading(true);

    if (data.name.length < 3) {
      formRef.current?.setFieldError('name', 'O campo precisa ser preenchido');
      setIsLoading(false);
      return;
    }

    if (id === 'nova') {
      CategoriesService
        .create(data)
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          } else {
            if (isSaveAndClose()) {
              navigate('/categories');
            } else {
              navigate(`/categories/detail/${result}`);
            }
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
            if (isSaveAndClose()) {
              navigate('/categories');
            }
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
          showButtonSaveAndClose
          showButtonNew={id !== 'nova'} 
          showButtonDelete={id !== 'nova'} 

          onClickInSave={save}
          onClickInReturn={() => navigate('/categories')}
          onClickInDelete={() => handleDelete(Number(id))}
          onClickInNew={() => navigate('/categories/detail/nova')}
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

      </UForm>
    </BasePageLayout>
  );
}; 
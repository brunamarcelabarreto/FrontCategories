import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DetailTool } from '../../shared/components';
import { BasePageLayout } from '../../shared/layouts';
import { CategoriesService } from '../../shared/services/api/categories/CategoriesService';
import { Form } from '@unform/web';
import { UTextField } from '../../shared/forms';


export const CategoryEdition: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');


  useEffect(() => {
    if(id !== 'nova') {
      setIsLoading(true);

      CategoriesService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if(result instanceof Error) {
            alert(result.message);
            navigate('/categories');
          } else {
            setName(result.name);
            console.log(result);
          }
        });
    }
  }, [id]);

  const handleSave = () => {
    console.log('save');
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

          onClickInSave={handleSave}
          onClickInSaveAndReturn={handleSave}
          onClickInBack={() => navigate('/categories')}
          onClickInDelete={() => handleDelete(Number(id))}
          onClickInNew={() => navigate('/categories/detail/nova')}
        />
      }
    >
    
      <Form onSubmit={(data) => console.log} >

        <UTextField 
          name='Nome'
        />
        <button type='submit'>Submit</button>
      </Form>
    </BasePageLayout>
  );
};


import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ListingTool } from '../../shared/components';
import { BasePageLayout } from '../../shared/layouts';
import { CategoriesService } from '../../shared/services/api/categories/CategoriesService';


export const CategoryListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => { 
    return searchParams.get('search') || '';
  }, [searchParams]); 

  useEffect(() => {
    CategoriesService.getAll()
      .then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);
        }

      });
  }, []);

  return (
    <BasePageLayout 
      title="Categorias"
      toolBar={
        <ListingTool  
          showSearchInput
          newButtonText='Novo'
          textSearch={search}
          switchTextSearch={text => setSearchParams({search: text}, { replace: true })}
        />
      }
    >
    </ BasePageLayout>
  );

};
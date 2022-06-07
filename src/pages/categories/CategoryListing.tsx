import { useEffect, useMemo, useState } from 'react';
import { ListingTool } from '../../shared/components';
import { BasePageLayout } from '../../shared/layouts';
import { CategoriesService } from '../../shared/services/api/categories/CategoriesService';


interface CategoryListingProps {
  name: string;
}

export const CategoryListing = () => {
  const [searchParams, setSearchParams] = useState('');
  const [result, setResult] = useState<CategoryListingProps[]>([]);
  // eslint-disable-next-line no-debugger
  debugger;
  useEffect(() => {
    CategoriesService.getAll()
      .then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setResult(result.data);
        }
      });
  }, []);

  const filtered = result.map(({name}) => name);
  
  const search = useMemo(() => { 
    const lowerSearch = searchParams.toLowerCase();
    return filtered.filter((name) => name.toLowerCase().includes(lowerSearch));
  }, [searchParams]);

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
      <ul>
        {search.map((name) => (
          <li key={name}>
            {name}
          </li>
        ))}
      </ul>
    </ BasePageLayout>
  );

};

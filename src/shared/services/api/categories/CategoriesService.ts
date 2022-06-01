import { Environment } from '../../../environment';
import { Api } from '../axios-config';

interface CategoryDetailProps {

}

interface CategoryListProps {
  id: number;
  name: string;
}

type CategoriesWithTotalCount = {
  data: CategoryListProps[];
  totalCount: number;
}

const getAll = async (page = 1, filter =''): Promise<any> => {
  try {
    // eslint-disable-next-line quotes
    const relativeUrl = `/categories?_page=${page}&_limit=${Environment.LIMIT_OF_LINES}&category_like=${filter}`;
    const { data } = await Api.get(relativeUrl);
  } catch (error) {

  }
};
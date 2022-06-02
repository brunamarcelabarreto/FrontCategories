import { Environment } from '../../../environment';
import { Api } from '../axios-config';

interface CategoryDetailProps {
  id: number;
  name: string;
}

interface CategoryListProps {
  id: number;
  name: string;
}

type CategoriesWithTotalCount = {
  data: CategoryListProps[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<CategoriesWithTotalCount | Error> => {
  try {
    // eslint-disable-next-line quotes
    const relativeUrl = `/categories?_page=${page}&_limit=${Environment.LIMIT_OF_LINES}&category_like=${filter}`;
    const { data, headers } = await Api.get(relativeUrl);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMIT_OF_LINES),
      };
    }
    return new Error('Erro ao listar as categorias.');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar as categorias.');
  }
};

const getById = async (id: number): Promise<CategoryDetailProps | Error> => {
  try {
    // eslint-disable-next-line quotes
    
    const { data } = await Api.get(`/categories/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar a categoria.');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar a categoria.');
  }
};

const create = async (): Promise<any> => {
  try {
    // eslint-disable-next-line quotes
    
    const { data } = await Api.get(`/categories/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar a categoria.');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar a categoria.');
};

const updateById = async (): Promise<any> => {};

const deleteById = async (): Promise<any> => {};

export const CategoriesService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
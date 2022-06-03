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
}

// const getAll = async (): Promise<CategoriesWithTotalCount> => {
//   try {
//     const { data } = await Api.get
//   }
// }
const getAll = async (): Promise<CategoriesWithTotalCount | Error> => {
  try {
    const { data } = await Api.get('/category');
    if (data) {
      return {
        data,
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
    const { data } = await Api.get(`/category/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar a categoria.');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar a categoria.');
  }
};

const create = async (dados: Omit<CategoryDetailProps, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<CategoryDetailProps>('category');

    if (data) {
      return data.id;
    }

    return new Error('Erro ao criar a categoria.');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar a categoria.');
  }
};

const updateById = async (id: number, data: CategoryDetailProps): Promise<void | Error> => {
  try {
    await Api.put(`/category/${id}`, data);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar a categoria.');
  }
};

const deleteById = async (id: number): Promise<any> => {
  try {
    await Api.delete(`/category/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao deletar a categoria.');
  }
};

export const CategoriesService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
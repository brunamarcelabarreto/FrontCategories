import { Api } from '../axios-config';

export interface ProductDetailProps {
  id: number;
  name: string;
  code: number;
  quantity: number;
  is_active: boolean;
  categoryId: number;
}

export interface ProductListProps {
  id: number;
  name: string;
  code: number;
  quantity: number;
  is_active: boolean;
  categoryId: number;
}

export type ProductsWithTotalCount = {
  data: ProductListProps[];
  totalCount?: number;
}

const getAll = async (): Promise<ProductsWithTotalCount | Error> => {
  try {
    const { data } = await Api.get('/product');
    if (data) {
      return {
        data,
        totalCount: data.totalCount,
      };
    }
    return new Error('Erro ao listar os produtos.');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os produtos.');
  }
};

const getById = async (id: number): Promise<ProductDetailProps | Error> => {
  try {
    const { data } = await Api.get(`/product/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o produto.');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o produto.');
  }
};

const create = async (data: Omit<ProductDetailProps, 'id'>): Promise<number | Error> => {
  try {
    const { data: responseData } = await Api.post<ProductDetailProps>('/product', data);

    if (responseData) {
      return responseData.id;
    }

    return new Error('Erro ao criar o produto.');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o produto.');
  }
};

const updateById = async (id: number, data: ProductDetailProps): Promise<void | Error> => {
  try {
    await Api.put(`/product/${id}`, data); 
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o produto.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/product/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao deletar o produto.');
  }
};

const getByCategoryId = async (id: number): Promise<ProductsWithTotalCount | Error> => {
  try {
    const { data } = await Api.get(`/category/detail/${id}`);

    if (data) {
      return {data};
    }
    return new Error('Erro ao consultar o produto.');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o produto.');
  }
};


export const ProductsService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
  getByCategoryId,
};
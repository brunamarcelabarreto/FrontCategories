import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {
  
  if (error.message === 'Network error') {
    return Promise.reject(new Error('Erro de conexão.'));
  }

  if (error.response?.status ===401) {
    //Do something with the response
  }
  return Promise.reject(error);
};
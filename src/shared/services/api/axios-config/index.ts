import axios from 'axios';

import { errorInterceptor, responseInterceptor } from './interceptors';

const Api = axios.create({
  baseURL: 'http://localhost:4000'
});
console.log(Api);
Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
);

export { Api };

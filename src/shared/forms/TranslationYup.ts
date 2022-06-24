import { setLocale } from 'yup';

setLocale({
  mixed: {
    default: 'Campo inválido',
    required: 'O campo é obrigatório',
  },
  string: {
    min: ({ min }) => `O campo deve ter no ${min} caracteres`,
  }
});
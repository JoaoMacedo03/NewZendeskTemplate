import { format } from 'date-fns';

export const orderArray = (array: [], field: string, bigger = true) => {
  if (!array) {
    return [];
  }

  let arraySorted = [];
  if (!bigger) {
    arraySorted = array.sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
  } else {
    arraySorted = array.sort((a, b) => {
      if (a[field] < b[field]) return 1;
      if (a[field] > b[field]) return -1;
      return 0;
    });
  }
  return arraySorted;
};

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const formatPrice = (value: number, currency?: string | 'BRL') => {
  const auxValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(value);
  return auxValue;
};

export const formatDate = (date: string, dateForm: string) => {
  const dateFormatted = format(new Date(Date.parse(date)), dateForm);
  return dateFormatted;
};

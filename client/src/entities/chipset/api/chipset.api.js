import api from '@shared/lib/api';
import { chipsetApiGraphQL } from './chipset.api.graphql';

const getApiType = () => {
  return localStorage.getItem('apiType') || 'rest';
};

export const chipsetApi = {
  getAll: async () => {
    if (getApiType() === 'graphql') {
      return chipsetApiGraphQL.getAll();
    }
    return api.get('/chipsets');
  },
};


import api from '@shared/lib/api';
import { vendorApiGraphQL } from './vendor.api.graphql';

const getApiType = () => {
  return localStorage.getItem('apiType') || 'rest';
};

export const vendorApi = {
  getAll: async () => {
    if (getApiType() === 'graphql') {
      return vendorApiGraphQL.getAll();
    }
    return api.get('/vendors');
  },
};


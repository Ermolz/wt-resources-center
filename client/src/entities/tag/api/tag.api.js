import api from '@shared/lib/api';
import { tagApiGraphQL } from './tag.api.graphql';

const getApiType = () => {
  return localStorage.getItem('apiType') || 'rest';
};

export const tagApi = {
  getAll: async () => {
    if (getApiType() === 'graphql') {
      return tagApiGraphQL.getAll();
    }
    return api.get('/tags');
  },
};


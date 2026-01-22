import api from '@shared/lib/api';
import { gpuApiGraphQL } from './gpu.api.graphql';

const getApiType = () => {
  return localStorage.getItem('apiType') || 'rest';
};

export const gpuApi = {
  getAll: async (filters = {}) => {
    if (getApiType() === 'graphql') {
      return gpuApiGraphQL.getAll(filters);
    }
    return api.get('/gpus', { params: filters });
  },
  getById: async (id) => {
    if (getApiType() === 'graphql') {
      return gpuApiGraphQL.getById(id);
    }
    return api.get(`/gpus/${id}`);
  },
  create: async (data) => {
    if (getApiType() === 'graphql') {
      return gpuApiGraphQL.create(data);
    }
    return api.post('/gpus', data);
  },
  update: async (id, data) => {
    if (getApiType() === 'graphql') {
      return gpuApiGraphQL.update(id, data);
    }
    return api.put(`/gpus/${id}`, data);
  },
  delete: async (id) => {
    if (getApiType() === 'graphql') {
      return gpuApiGraphQL.delete(id);
    }
    return api.delete(`/gpus/${id}`);
  },
  toggleStatus: async (id) => {
    if (getApiType() === 'graphql') {
      return gpuApiGraphQL.toggleStatus(id);
    }
    return api.patch(`/gpus/${id}/toggle`);
  },
};


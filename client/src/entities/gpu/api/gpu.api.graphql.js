import { apolloClient } from '@shared/lib/apollo';
import { GET_GPUS, GET_GPU } from '@shared/lib/graphql/queries';
import { CREATE_GPU, UPDATE_GPU, DELETE_GPU, TOGGLE_GPU_STATUS } from '@shared/lib/graphql/mutations';

const mapFilters = (filters) => {
  const graphqlFilters = {};
  
  if (filters.status) graphqlFilters.status = filters.status;
  if (filters.chipsetId) graphqlFilters.chipsetId = filters.chipsetId;
  if (filters.vendorId) graphqlFilters.vendorId = filters.vendorId;
  if (filters.minMemory) graphqlFilters.minMemory = parseInt(filters.minMemory);
  if (filters.maxMemory) graphqlFilters.maxMemory = parseInt(filters.maxMemory);
  if (filters.minTdp) graphqlFilters.minTdp = parseInt(filters.minTdp);
  if (filters.maxTdp) graphqlFilters.maxTdp = parseInt(filters.maxTdp);
  if (filters.minPrice) graphqlFilters.minPrice = parseFloat(filters.minPrice);
  if (filters.maxPrice) graphqlFilters.maxPrice = parseFloat(filters.maxPrice);
  if (filters.search) graphqlFilters.search = filters.search;
  if (filters.tagIds && filters.tagIds.length > 0) graphqlFilters.tagIds = filters.tagIds;
  
  return Object.keys(graphqlFilters).length > 0 ? graphqlFilters : undefined;
};

const mapGpuInput = (data) => {
  const input = {};
  
  if (data.name !== undefined) input.name = data.name;
  if (data.chipsetId !== undefined) input.chipsetId = data.chipsetId;
  if (data.vendorId !== undefined) input.vendorId = data.vendorId;
  if (data.memoryGB !== undefined) input.memoryGB = parseInt(data.memoryGB);
  if (data.memoryType !== undefined) input.memoryType = data.memoryType;
  if (data.tdp !== undefined) input.tdp = parseInt(data.tdp);
  if (data.price !== undefined) input.price = parseFloat(data.price);
  if (data.status !== undefined) input.status = data.status;
  if (data.description !== undefined) input.description = data.description;
  if (data.tagIds !== undefined) input.tagIds = data.tagIds;
  
  return input;
};

export const gpuApiGraphQL = {
  getAll: async (filters = {}) => {
    const graphqlFilters = mapFilters(filters);
    const { data } = await apolloClient.query({
      query: GET_GPUS,
      variables: { filters: graphqlFilters },
      fetchPolicy: 'network-only',
    });
    
    return {
      data: data.getGpus,
    };
  },
  
  getById: async (id) => {
    const { data } = await apolloClient.query({
      query: GET_GPU,
      variables: { id },
      fetchPolicy: 'network-only',
    });
    
    return {
      data: data.getGpu,
    };
  },
  
  create: async (data) => {
    const input = mapGpuInput(data);
    const { data: result } = await apolloClient.mutate({
      mutation: CREATE_GPU,
      variables: { input },
      refetchQueries: [{ query: GET_GPUS }],
    });
    
    return {
      data: result.createGpu,
    };
  },
  
  update: async (id, data) => {
    const input = mapGpuInput(data);
    const { data: result } = await apolloClient.mutate({
      mutation: UPDATE_GPU,
      variables: { id, input },
      refetchQueries: [{ query: GET_GPUS }, { query: GET_GPU, variables: { id } }],
    });
    
    return {
      data: result.updateGpu,
    };
  },
  
  delete: async (id) => {
    await apolloClient.mutate({
      mutation: DELETE_GPU,
      variables: { id },
      refetchQueries: [{ query: GET_GPUS }],
    });
    
    return { data: { success: true } };
  },
  
  toggleStatus: async (id) => {
    const { data: result } = await apolloClient.mutate({
      mutation: TOGGLE_GPU_STATUS,
      variables: { id },
      refetchQueries: [{ query: GET_GPUS }, { query: GET_GPU, variables: { id } }],
    });
    
    return {
      data: result.toggleGpuStatus,
    };
  },
};


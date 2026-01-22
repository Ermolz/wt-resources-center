const gpuService = require('../services/gpu.service');
const chipsetService = require('../services/chipset.service');
const vendorService = require('../services/vendor.service');
const tagService = require('../services/tag.service');
const prisma = require('../config/database');

const resolvers = {
  Query: {
    getGpus: async (parent, { filters = {} }) => {
      const result = await gpuService.getAll(filters);
      return result.data || result;
    },
    getGpu: async (parent, { id }) => {
      return gpuService.getById(id);
    },
    getChipsets: async () => {
      return chipsetService.getAll();
    },
    getVendors: async () => {
      return vendorService.getAll();
    },
    getTags: async () => {
      return tagService.getAll();
    },
    me: async (parent, args, { user }) => {
      if (!user) {
        return null;
      }
      return prisma.user.findUnique({
        where: { id: user.userId },
      });
    },
  },
  Mutation: {
    createGpu: async (parent, { input }, { user, io }) => {
      if (!user || user.role !== 'ADMIN') {
        throw new Error('Admin access required');
      }
      const gpu = await gpuService.create(input);
      if (io) io.emit('gpu:created', gpu);
      return gpu;
    },
    updateGpu: async (parent, { id, input }, { user, io }) => {
      if (!user || user.role !== 'ADMIN') {
        throw new Error('Admin access required');
      }
      const gpu = await gpuService.update(id, input);
      if (io) io.emit('gpu:updated', gpu);
      return gpu;
    },
    deleteGpu: async (parent, { id }, { user, io }) => {
      if (!user || user.role !== 'ADMIN') {
        throw new Error('Admin access required');
      }
      await gpuService.remove(id);
      if (io) io.emit('gpu:deleted', { id });
      return true;
    },
    toggleGpuStatus: async (parent, { id }, { user, io }) => {
      if (!user || user.role !== 'ADMIN') {
        throw new Error('Admin access required');
      }
      const gpu = await gpuService.toggleStatus(id);
      if (io) io.emit('gpu:status-changed', { id, status: gpu.status });
      return gpu;
    },
  },
};

module.exports = resolvers;


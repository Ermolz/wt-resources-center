const prisma = require('../config/database');

const getAll = async (filters = {}) => {
  const where = {};

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.chipsetId) {
    where.chipsetId = filters.chipsetId;
  }

  if (filters.vendorId) {
    where.vendorId = filters.vendorId;
  }

  if (filters.minMemory) {
    where.memoryGB = { gte: parseInt(filters.minMemory) };
  }

  if (filters.maxMemory) {
    where.memoryGB = {
      ...where.memoryGB,
      lte: parseInt(filters.maxMemory),
    };
  }

  if (filters.minTdp) {
    where.tdp = { gte: parseInt(filters.minTdp) };
  }

  if (filters.maxTdp) {
    where.tdp = {
      ...where.tdp,
      lte: parseInt(filters.maxTdp),
    };
  }

  if (filters.minPrice) {
    where.price = { gte: parseFloat(filters.minPrice) };
  }

  if (filters.maxPrice) {
    where.price = {
      ...where.price,
      lte: parseFloat(filters.maxPrice),
    };
  }

  if (filters.search) {
    where.name = {
      contains: filters.search,
      mode: 'insensitive',
    };
  }

  if (filters.tagIds && filters.tagIds.length > 0) {
    where.tags = {
      some: {
        id: {
          in: filters.tagIds,
        },
      },
    };
  }

  const queryOptions = {
    where,
    include: {
      chipset: true,
      vendor: true,
      tags: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  };
  
  if (filters.skip !== undefined) {
    queryOptions.skip = filters.skip;
  }
  if (filters.take !== undefined) {
    queryOptions.take = filters.take;
  }
  
  return prisma.gpu.findMany(queryOptions);
};

const count = async (filters = {}) => {
  const where = {};
  
  if (filters.status) {
    where.status = filters.status;
  }
  if (filters.chipsetId) {
    where.chipsetId = filters.chipsetId;
  }
  if (filters.vendorId) {
    where.vendorId = filters.vendorId;
  }
  if (filters.minMemory) {
    where.memoryGB = { gte: parseInt(filters.minMemory) };
  }
  if (filters.maxMemory) {
    where.memoryGB = {
      ...where.memoryGB,
      lte: parseInt(filters.maxMemory),
    };
  }
  if (filters.minTdp) {
    where.tdp = { gte: parseInt(filters.minTdp) };
  }
  if (filters.maxTdp) {
    where.tdp = {
      ...where.tdp,
      lte: parseInt(filters.maxTdp),
    };
  }
  if (filters.minPrice) {
    where.price = { gte: parseFloat(filters.minPrice) };
  }
  if (filters.maxPrice) {
    where.price = {
      ...where.price,
      lte: parseFloat(filters.maxPrice),
    };
  }
  if (filters.search) {
    where.name = {
      contains: filters.search,
      mode: 'insensitive',
    };
  }
  if (filters.tagIds && filters.tagIds.length > 0) {
    where.tags = {
      some: {
        id: {
          in: filters.tagIds,
        },
      },
    };
  }
  
  return prisma.gpu.count({ where });
};

const getById = async (id) => {
  return prisma.gpu.findUnique({
    where: { id },
    include: {
      chipset: true,
      vendor: true,
      tags: true,
    },
  });
};

const create = async (data) => {
  const { tagIds, ...gpuData } = data;

  const gpu = await prisma.gpu.create({
    data: {
      ...gpuData,
      tags: tagIds
        ? {
            connect: tagIds.map((id) => ({ id })),
          }
        : undefined,
    },
    include: {
      chipset: true,
      vendor: true,
      tags: true,
    },
  });

  return gpu;
};

const update = async (id, data) => {
  const { tagIds, ...gpuData } = data;

  const gpu = await prisma.gpu.update({
    where: { id },
    data: {
      ...gpuData,
      tags: tagIds
        ? {
            set: tagIds.map((id) => ({ id })),
          }
        : undefined,
    },
    include: {
      chipset: true,
      vendor: true,
      tags: true,
    },
  });

  return gpu;
};

const remove = async (id) => {
  await prisma.gpu.delete({
    where: { id },
  });
};

const toggleStatus = async (id) => {
  const gpu = await prisma.gpu.findUnique({
    where: { id },
  });

  if (!gpu) {
    throw new Error('GPU not found');
  }

  const statusMap = {
    AVAILABLE: 'DISCONTINUED',
    DISCONTINUED: 'AVAILABLE',
    COMING_SOON: 'AVAILABLE',
  };

  const newStatus = statusMap[gpu.status] || 'AVAILABLE';

  return prisma.gpu.update({
    where: { id },
    data: { status: newStatus },
    include: {
      chipset: true,
      vendor: true,
      tags: true,
    },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  toggleStatus,
  count,
};


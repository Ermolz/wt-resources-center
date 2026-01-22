const { z } = require('zod');

const gpuStatusEnum = z.enum(['AVAILABLE', 'DISCONTINUED', 'COMING_SOON']);

const createGpuSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    chipsetId: z.string().uuid('Invalid chipset ID'),
    vendorId: z.string().uuid('Invalid vendor ID'),
    memoryGB: z.number().int().positive('Memory must be a positive integer'),
    memoryType: z.string().min(1, 'Memory type is required'),
    tdp: z.number().int().positive('TDP must be a positive integer'),
    price: z.number().nonnegative('Price must be non-negative'),
    status: gpuStatusEnum.optional(),
    description: z.string().optional(),
    tagIds: z.array(z.string().uuid()).optional(),
  }),
});

const updateGpuSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    chipsetId: z.string().uuid('Invalid chipset ID').optional(),
    vendorId: z.string().uuid('Invalid vendor ID').optional(),
    memoryGB: z.number().int().positive('Memory must be a positive integer').optional(),
    memoryType: z.string().min(1, 'Memory type is required').optional(),
    tdp: z.number().int().positive('TDP must be a positive integer').optional(),
    price: z.number().nonnegative('Price must be non-negative').optional(),
    status: gpuStatusEnum.optional(),
    description: z.string().optional(),
    tagIds: z.array(z.string().uuid()).optional(),
  }),
  params: z.object({
    id: z.string().uuid('Invalid GPU ID'),
  }),
});

const getGpuSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid GPU ID'),
  }),
});

const deleteGpuSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid GPU ID'),
  }),
});

const toggleGpuSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid GPU ID'),
  }),
});

const getGpusSchema = z.object({
  query: z.object({
    status: gpuStatusEnum.optional(),
    chipsetId: z.string().uuid().optional(),
    vendorId: z.string().uuid().optional(),
    minMemory: z.string().optional(),
    maxMemory: z.string().optional(),
    minTdp: z.string().optional(),
    maxTdp: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    search: z.string().optional(),
    tagIds: z.string().optional(),
  }),
});

module.exports = {
  createGpuSchema,
  updateGpuSchema,
  getGpuSchema,
  deleteGpuSchema,
  toggleGpuSchema,
  getGpusSchema,
};


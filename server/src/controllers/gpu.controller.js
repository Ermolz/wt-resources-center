const gpuService = require('../services/gpu.service');
const { sendSuccess, sendError } = require('../utils/response');

const getAll = async (req, res, next) => {
  try {
    const filters = { ...req.query };
    if (filters.tagIds) {
      filters.tagIds = filters.tagIds.split(',');
    }
    
    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 20;
    const skip = (page - 1) * limit;
    
    delete filters.page;
    delete filters.limit;
    
    const [gpus, total] = await Promise.all([
      gpuService.getAll({ ...filters, skip, take: limit }),
      gpuService.count(filters),
    ]);
    
    const totalPages = Math.ceil(total / limit);
    
    return sendSuccess(res, gpus, 200, {
      page,
      size: limit,
      totalElements: total,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const gpu = await gpuService.getById(id);
    if (!gpu) {
      return sendError(res, 'GPU_NOT_FOUND', 'GPU not found', null, 404);
    }
    return sendSuccess(res, gpu);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const gpu = await gpuService.create(req.body);
    req.io.emit('gpu:created', gpu);
    return sendSuccess(res, gpu, 201);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const gpu = await gpuService.update(id, req.body);
    req.io.emit('gpu:updated', gpu);
    return sendSuccess(res, gpu);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await gpuService.remove(id);
    req.io.emit('gpu:deleted', { id });
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const toggleStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const gpu = await gpuService.toggleStatus(id);
    req.io.emit('gpu:status-changed', { id, status: gpu.status });
    return sendSuccess(res, gpu);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  toggleStatus,
};


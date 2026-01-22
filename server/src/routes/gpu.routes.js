const express = require('express');
const router = express.Router();
const gpuController = require('../controllers/gpu.controller');
const { authenticate, requireAdmin } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const {
  createGpuSchema,
  updateGpuSchema,
  getGpuSchema,
  deleteGpuSchema,
  toggleGpuSchema,
  getGpusSchema,
} = require('../validators/gpu.validator');

router.get('/', validate(getGpusSchema), gpuController.getAll);
router.get('/:id', validate(getGpuSchema), gpuController.getById);
router.post(
  '/',
  authenticate,
  requireAdmin,
  validate(createGpuSchema),
  gpuController.create
);
router.put(
  '/:id',
  authenticate,
  requireAdmin,
  validate(updateGpuSchema),
  gpuController.update
);
router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  validate(deleteGpuSchema),
  gpuController.remove
);
router.patch(
  '/:id/toggle',
  authenticate,
  requireAdmin,
  validate(toggleGpuSchema),
  gpuController.toggleStatus
);

module.exports = router;


import { useState, useEffect } from 'react';
import { Modal } from '@shared/ui/Modal';
import { Input } from '@shared/ui/Input';
import { Select } from '@shared/ui/Select';
import { Button } from '@shared/ui/Button';
import { gpuApi } from '@entities/gpu/api/gpu.api';
import { chipsetApi } from '@entities/chipset/api/chipset.api';
import { vendorApi } from '@entities/vendor/api/vendor.api';
import { tagApi } from '@entities/tag/api/tag.api';
import { z } from 'zod';

const updateSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  chipsetId: z.string().uuid('Chipset is required').optional(),
  vendorId: z.string().uuid('Vendor is required').optional(),
  memoryGB: z.number().int().positive('Memory must be a positive integer').optional(),
  memoryType: z.string().min(1, 'Memory type is required').optional(),
  tdp: z.number().int().positive('TDP must be a positive integer').optional(),
  price: z.number().nonnegative('Price must be non-negative').optional(),
  status: z.enum(['AVAILABLE', 'DISCONTINUED', 'COMING_SOON']).optional(),
  description: z.string().optional(),
});

export const GpuEditForm = ({ gpu, onClose }) => {
  const [formData, setFormData] = useState({
    name: gpu.name,
    chipsetId: gpu.chipsetId,
    vendorId: gpu.vendorId,
    memoryGB: gpu.memoryGB.toString(),
    memoryType: gpu.memoryType,
    tdp: gpu.tdp.toString(),
    price: gpu.price.toString(),
    status: gpu.status,
    description: gpu.description || '',
    tagIds: gpu.tags?.map((t) => t.id) || [],
  });
  const [chipsets, setChipsets] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    try {
      const [chipsetsRes, vendorsRes, tagsRes] = await Promise.all([
        chipsetApi.getAll(),
        vendorApi.getAll(),
        tagApi.getAll(),
      ]);
      setChipsets(chipsetsRes.data);
      setVendors(vendorsRes.data);
      setTags(tagsRes.data);
    } catch (error) {
      console.error('Failed to load options:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const dataToUpdate = {};
      if (formData.name !== gpu.name) dataToUpdate.name = formData.name;
      if (formData.chipsetId !== gpu.chipsetId) dataToUpdate.chipsetId = formData.chipsetId;
      if (formData.vendorId !== gpu.vendorId) dataToUpdate.vendorId = formData.vendorId;
      if (parseInt(formData.memoryGB) !== gpu.memoryGB) {
        dataToUpdate.memoryGB = parseInt(formData.memoryGB);
      }
      if (formData.memoryType !== gpu.memoryType) {
        dataToUpdate.memoryType = formData.memoryType;
      }
      if (parseInt(formData.tdp) !== gpu.tdp) {
        dataToUpdate.tdp = parseInt(formData.tdp);
      }
      if (parseFloat(formData.price) !== gpu.price) {
        dataToUpdate.price = parseFloat(formData.price);
      }
      if (formData.status !== gpu.status) dataToUpdate.status = formData.status;
      if (formData.description !== (gpu.description || '')) {
        dataToUpdate.description = formData.description;
      }

      const validated = updateSchema.parse(dataToUpdate);

      setLoading(true);
      await gpuApi.update(gpu.id, {
        ...validated,
        tagIds: formData.tagIds,
      });
      onClose();
    } catch (error) {
      if (error.errors) {
        const zodErrors = {};
        error.errors.forEach((err) => {
          zodErrors[err.path[0]] = err.message;
        });
        setErrors(zodErrors);
      } else {
        const errorMessage = error.response?.data?.message || error.response?.data?.error?.message || 'Failed to update GPU';
        setErrors({ submit: errorMessage });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Edit GPU">
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
        />
        <Select
          label="Chipset"
          value={formData.chipsetId}
          onChange={(e) => setFormData({ ...formData, chipsetId: e.target.value })}
          error={errors.chipsetId}
          options={[
            { value: '', label: 'Select chipset' },
            ...chipsets.map((c) => ({
              value: c.id,
              label: `${c.name} (${c.manufacturer})`,
            })),
          ]}
        />
        <Select
          label="Vendor"
          value={formData.vendorId}
          onChange={(e) => setFormData({ ...formData, vendorId: e.target.value })}
          error={errors.vendorId}
          options={[
            { value: '', label: 'Select vendor' },
            ...vendors.map((v) => ({ value: v.id, label: v.name })),
          ]}
        />
        <Input
          label="Memory (GB)"
          type="number"
          value={formData.memoryGB}
          onChange={(e) => setFormData({ ...formData, memoryGB: e.target.value })}
          error={errors.memoryGB}
        />
        <Input
          label="Memory Type"
          value={formData.memoryType}
          onChange={(e) => setFormData({ ...formData, memoryType: e.target.value })}
          error={errors.memoryType}
        />
        <Input
          label="TDP (W)"
          type="number"
          value={formData.tdp}
          onChange={(e) => setFormData({ ...formData, tdp: e.target.value })}
          error={errors.tdp}
        />
        <Input
          label="Price ($)"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          error={errors.price}
        />
        <Select
          label="Status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          options={[
            { value: 'AVAILABLE', label: 'Available' },
            { value: 'DISCONTINUED', label: 'Discontinued' },
            { value: 'COMING_SOON', label: 'Coming Soon' },
          ]}
        />
        <Input
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          error={errors.description}
        />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="space-y-2">
            {tags.map((tag) => (
              <label key={tag.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.tagIds.includes(tag.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        tagIds: [...formData.tagIds, tag.id],
                      });
                    } else {
                      setFormData({
                        ...formData,
                        tagIds: formData.tagIds.filter((id) => id !== tag.id),
                      });
                    }
                  }}
                  className="mr-2"
                />
                <span>{tag.name}</span>
              </label>
            ))}
          </div>
        </div>
        {errors.submit && (
          <p className="text-red-600 text-sm mb-4">{errors.submit}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </Button>
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};


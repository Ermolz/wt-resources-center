import { useState, useEffect } from 'react';
import { Input } from '@shared/ui/Input';
import { Select } from '@shared/ui/Select';
import { Card } from '@shared/ui/Card';
import { Button } from '@shared/ui/Button';
import { chipsetApi } from '@entities/chipset/api/chipset.api';
import { vendorApi } from '@entities/vendor/api/vendor.api';
import { tagApi } from '@entities/tag/api/tag.api';

export const GpuFilters = ({ filters, onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [chipsets, setChipsets] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [_tags, setTags] = useState([]);

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
      console.error('Failed to load filter options:', error);
    }
  };

  useEffect(() => {
    queueMicrotask(() => loadOptions());
  }, []);

  useEffect(() => {
    onFiltersChange(localFilters);
  }, [localFilters, onFiltersChange]);

  const handleChange = (field, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: value || undefined,
    }));
  };

  const handleReset = () => {
    setLocalFilters({});
  };

  return (
    <Card className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        <Input
          label="Search"
          placeholder="Search by name..."
          value={localFilters.search || ''}
          onChange={(e) => handleChange('search', e.target.value)}
        />
        <Select
          label="Chipset"
          value={localFilters.chipsetId || ''}
          onChange={(e) => handleChange('chipsetId', e.target.value)}
          options={[
            { value: '', label: 'All' },
            ...chipsets.map((c) => ({
              value: c.id,
              label: `${c.name} (${c.manufacturer})`,
            })),
          ]}
        />
        <Select
          label="Vendor"
          value={localFilters.vendorId || ''}
          onChange={(e) => handleChange('vendorId', e.target.value)}
          options={[
            { value: '', label: 'All' },
            ...vendors.map((v) => ({ value: v.id, label: v.name })),
          ]}
        />
        <Select
          label="Status"
          value={localFilters.status || ''}
          onChange={(e) => handleChange('status', e.target.value)}
          options={[
            { value: '', label: 'All' },
            { value: 'AVAILABLE', label: 'Available' },
            { value: 'DISCONTINUED', label: 'Discontinued' },
            { value: 'COMING_SOON', label: 'Coming Soon' },
          ]}
        />
        <Input
          label="Min Memory (GB)"
          type="number"
          value={localFilters.minMemory || ''}
          onChange={(e) => handleChange('minMemory', e.target.value)}
        />
        <Input
          label="Max Memory (GB)"
          type="number"
          value={localFilters.maxMemory || ''}
          onChange={(e) => handleChange('maxMemory', e.target.value)}
        />
        <Input
          label="Min TDP (W)"
          type="number"
          value={localFilters.minTdp || ''}
          onChange={(e) => handleChange('minTdp', e.target.value)}
        />
        <Input
          label="Max TDP (W)"
          type="number"
          value={localFilters.maxTdp || ''}
          onChange={(e) => handleChange('maxTdp', e.target.value)}
        />
        <Input
          label="Min Price ($)"
          type="number"
          value={localFilters.minPrice || ''}
          onChange={(e) => handleChange('minPrice', e.target.value)}
        />
        <Input
          label="Max Price ($)"
          type="number"
          value={localFilters.maxPrice || ''}
          onChange={(e) => handleChange('maxPrice', e.target.value)}
        />
      </div>
      <div className="mt-5 pt-4 flex justify-end border-t border-gray-100 dark:border-gray-700/80">
        <Button variant="secondary" onClick={handleReset}>
          Reset Filters
        </Button>
      </div>
    </Card>
  );
};


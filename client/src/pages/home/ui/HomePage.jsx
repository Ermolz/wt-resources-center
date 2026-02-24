import { GpuGrid } from '@widgets/gpu-grid';
import { GpuFilters } from '@widgets/gpu-filters';
import { Navbar } from '@shared/ui/Navbar';
import { useState } from 'react';
import { useI18n } from '@shared/lib/i18n';

export const HomePage = () => {
  const [filters, setFilters] = useState({});
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">{t('gpuCatalog')}</h1>
          <p className="mt-1.5 text-sm sm:text-base text-gray-600 dark:text-gray-400">{t('discover')}</p>
        </div>
        <GpuFilters filters={filters} onFiltersChange={setFilters} />
        <GpuGrid filters={filters} />
      </main>
    </div>
  );
};


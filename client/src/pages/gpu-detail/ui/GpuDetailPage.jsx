import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gpuApi } from '@entities/gpu/api/gpu.api';
import { Card } from '@shared/ui/Card';
import { Button } from '@shared/ui/Button';
import { Navbar } from '@shared/ui/Navbar';

export const GpuDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gpu, setGpu] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGpu = async () => {
      try {
        const response = await gpuApi.getById(id);
        setGpu(response.data);
      } catch (error) {
        console.error('Failed to load GPU:', error);
      } finally {
        setLoading(false);
      }
    };
    loadGpu();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary-200 dark:border-primary-700 border-t-primary-600 dark:border-t-primary-400" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!gpu) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="p-8 text-center">
          <p className="text-gray-900 dark:text-white mb-4">GPU not found</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <Button onClick={() => navigate('/')} variant="secondary" className="mb-4 sm:mb-6 text-sm sm:text-base">
          ← Back to Catalog
        </Button>
        <Card>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white break-words">{gpu.name}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Chipset</p>
              <p className="font-semibold text-gray-900 dark:text-white">{gpu.chipset.name}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Vendor</p>
              <p className="font-semibold text-gray-900 dark:text-white">{gpu.vendor.name}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Memory</p>
              <p className="font-semibold text-gray-900 dark:text-white">{gpu.memoryGB} GB {gpu.memoryType}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">TDP</p>
              <p className="font-semibold text-gray-900 dark:text-white">{gpu.tdp}W</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Price</p>
              <p className="font-semibold text-gray-900 dark:text-white">${gpu.price}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Status</p>
              <p className="font-semibold text-gray-900 dark:text-white">{gpu.status}</p>
            </div>
          </div>
          {gpu.description && (
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400 mb-2">Description</p>
              <p className="text-gray-900 dark:text-white">{gpu.description}</p>
            </div>
          )}
          {gpu.tags && gpu.tags.length > 0 && (
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm sm:text-base">Tags</p>
              <div className="flex flex-wrap gap-2">
                {gpu.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-200 rounded-lg text-sm font-medium"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};


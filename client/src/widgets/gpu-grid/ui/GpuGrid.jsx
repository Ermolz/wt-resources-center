import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { gpuApi } from '@entities/gpu/api/gpu.api';
import { Card } from '@shared/ui/Card';
import { useSocket } from '@shared/lib/socket';

export const GpuGrid = ({ filters }) => {
  const navigate = useNavigate();
  const socket = useSocket();
  const [gpus, setGpus] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadGpus = useCallback(async () => {
    setLoading(true);
    try {
      const response = await gpuApi.getAll(filters);
      setGpus(response.data);
    } catch (error) {
      console.error('Failed to load GPUs:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadGpus();
  }, [loadGpus]);

  useEffect(() => {
    if (!socket) return;

    const handleGpuCreated = (gpu) => {
      setGpus((prev) => [gpu, ...prev]);
    };

    const handleGpuUpdated = (gpu) => {
      setGpus((prev) =>
        prev.map((g) => (g.id === gpu.id ? gpu : g))
      );
    };

    const handleGpuDeleted = ({ id }) => {
      setGpus((prev) => prev.filter((g) => g.id !== id));
    };

    const handleStatusChanged = ({ id, status }) => {
      setGpus((prev) =>
        prev.map((g) => (g.id === id ? { ...g, status } : g))
      );
    };

    socket.on('gpu:created', handleGpuCreated);
    socket.on('gpu:updated', handleGpuUpdated);
    socket.on('gpu:deleted', handleGpuDeleted);
    socket.on('gpu:status-changed', handleStatusChanged);

    return () => {
      socket.off('gpu:created', handleGpuCreated);
      socket.off('gpu:updated', handleGpuUpdated);
      socket.off('gpu:deleted', handleGpuDeleted);
      socket.off('gpu:status-changed', handleStatusChanged);
    };
  }, [socket]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary-200 dark:border-primary-700 border-t-primary-600 dark:border-t-primary-400" />
        <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">Loading GPUs...</p>
      </div>
    );
  }

  if (gpus.length === 0) {
    return (
      <div className="text-center py-16 sm:py-24 rounded-xl bg-gray-100/50 dark:bg-gray-800/30 border border-dashed border-gray-300 dark:border-gray-600">
        <span className="text-5xl sm:text-6xl opacity-60">🔍</span>
        <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No GPUs found</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-6 sm:mt-8">
      {gpus.map((gpu) => (
        <Card
          key={gpu.id}
          className="cursor-pointer hover:shadow-card-hover transition-all duration-250 hover:-translate-y-0.5"
          onClick={() => navigate(`/gpu/${gpu.id}`)}
        >
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">{gpu.name}</h3>
          <div className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <p>{gpu.chipset.name} — {gpu.vendor.name}</p>
            <p>{gpu.memoryGB} GB {gpu.memoryType}</p>
            <p>TDP: {gpu.tdp}W</p>
            <p className="text-base font-semibold text-primary-600 dark:text-primary-400 mt-2">${gpu.price}</p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700/80">
            <span
              className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                gpu.status === 'AVAILABLE'
                  ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200'
                  : gpu.status === 'DISCONTINUED'
                  ? 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200'
                  : 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200'
              }`}
            >
              {gpu.status}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
};


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
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading GPUs...</p>
      </div>
    );
  }

  if (gpus.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No GPUs found</h3>
        <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-8">
      {gpus.map((gpu) => (
        <Card
          key={gpu.id}
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate(`/gpu/${gpu.id}`)}
        >
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{gpu.name}</h3>
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <p>{gpu.chipset.name} - {gpu.vendor.name}</p>
            <p>{gpu.memoryGB} GB {gpu.memoryType}</p>
            <p>TDP: {gpu.tdp}W</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">${gpu.price}</p>
          </div>
          <div className="flex items-center justify-between">
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                gpu.status === 'AVAILABLE'
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  : gpu.status === 'DISCONTINUED'
                  ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
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


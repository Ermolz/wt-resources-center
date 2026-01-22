import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gpuApi } from '@entities/gpu/api/gpu.api';
import { AdminTable } from '@widgets/admin-table';
import { Button } from '@shared/ui/Button';
import { Navbar } from '@shared/ui/Navbar';
import { GpuCreateForm } from '@features/gpu-create';
import { GpuEditForm } from '@features/gpu-edit';

export const AdminPage = () => {
  const navigate = useNavigate();
  const [gpus, setGpus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingGpu, setEditingGpu] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    loadGpus();
  }, [navigate]);

  const loadGpus = async () => {
    try {
      const response = await gpuApi.getAll();
      setGpus(response.data);
    } catch (error) {
      console.error('Failed to load GPUs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setShowCreateModal(true);
  };

  const handleEdit = (gpu) => {
    setEditingGpu(gpu);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this GPU?')) {
      try {
        await gpuApi.delete(id);
        loadGpus();
      } catch (error) {
        console.error('Failed to delete GPU:', error);
      }
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await gpuApi.toggleStatus(id);
      loadGpus();
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">Admin Panel</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Manage GPU catalog</p>
          </div>
          <Button onClick={handleCreate} className="w-full sm:w-auto">Add GPU</Button>
        </div>
        <AdminTable
          gpus={gpus}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      </main>
      {showCreateModal && (
        <GpuCreateForm
          onClose={() => {
            setShowCreateModal(false);
            loadGpus();
          }}
        />
      )}
      {editingGpu && (
        <GpuEditForm
          gpu={editingGpu}
          onClose={() => {
            setEditingGpu(null);
            loadGpus();
          }}
        />
      )}
    </div>
  );
};


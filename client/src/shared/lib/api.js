import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.data && typeof response.data === 'object' && 'success' in response.data && 'data' in response.data) {
      response.data = response.data.data;
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    if (error.response?.data && typeof error.response.data === 'object' && 'error' in error.response.data) {
      const errorData = error.response.data.error;
      error.response.data = {
        message: errorData.message || 'An error occurred',
        code: errorData.code,
        details: errorData.details,
      };
    }
    
    return Promise.reject(error);
  }
);

export default api;


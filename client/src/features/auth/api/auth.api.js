import api from '@shared/lib/api';

export const authApi = {
  register: (email, password) => {
    return api.post('/auth/register', { email, password });
  },
  login: (email, password) => {
    return api.post('/auth/login', { email, password });
  },
  confirm: (token) => {
    return api.get(`/auth/confirm/${token}`);
  },
};


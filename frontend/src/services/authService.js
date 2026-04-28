import api from './api';

export const authService = {
  async login(email, password) {
    const { data } = await api.post('/api/auth/login', { email, password });
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  },

  async register(payload) {
    const { data } = await api.post('/api/auth/register', payload);
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  },

  async getProfile() {
    const { data } = await api.get('/api/auth/me');
    return data;
  },

  async updateProfile(payload) {
    const { data } = await api.put('/api/auth/update-profile', payload);
    return data;
  },

  async logout() {
    await api.post('/api/auth/logout');
    localStorage.removeItem('token');
  },
};

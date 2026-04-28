import api from './api';

export const rescueService = {
  async getNearby(lat, lng, radius = 10000, type) {
    const params = { lat, lng, radius };
    if (type && type !== 'all') {
      params.type = type;
    }
    const { data } = await api.get('/api/rescue/nearby', { params });
    return data;
  },

  async search(city) {
    const { data } = await api.get('/api/rescue/search', { params: { city } });
    return data;
  },

  async getEmergency() {
    const { data } = await api.get('/api/rescue/emergency');
    return data;
  },

  async getDashboard() {
    const { data } = await api.get('/api/rescue/dashboard');
    return data;
  },

  async getOverview() {
    const { data } = await api.get('/api/rescue/overview');
    return data;
  },

  async getCompleteDashboard() {
    const { data } = await api.get('/api/rescue/dashboard/complete');
    return data;
  },

  async submitReport(payload) {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        formData.append(key, value);
      }
    });

    const { data } = await api.post('/api/rescue/report', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
};

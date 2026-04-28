import api from './api';

export const donationService = {
  async getStats() {
    const { data } = await api.get('/api/donation/stats');
    return data;
  },

  async createDonation(payload) {
    const { data } = await api.post('/api/donation/create', payload);
    return data;
  },

  async verifyDonation(payload) {
    const { data } = await api.post('/api/donation/verify', payload);
    return data;
  },

  async getHistory() {
    const { data } = await api.get('/api/donation/history');
    return data;
  },
};

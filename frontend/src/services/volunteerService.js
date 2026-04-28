import api from './api';

export const volunteerService = {
  async getOpportunities() {
    const { data } = await api.get('/api/volunteer/opportunities');
    return data;
  },
};

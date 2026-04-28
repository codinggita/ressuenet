import api from './api';

export const adoptionService = {
  async getPets(filters = {}) {
    const { data } = await api.get('/api/adoption/pets', { params: filters });
    return data;
  },

  async getPetById(id) {
    const { data } = await api.get(`/api/adoption/pets/${id}`);
    return data;
  },

  async addFavorite(petId) {
    const { data } = await api.post('/api/adoption/favorite', { petId });
    return data;
  },

  async removeFavorite(petId) {
    const { data } = await api.delete(`/api/adoption/favorite/${petId}`);
    return data;
  },

  async getFavorites() {
    const { data } = await api.get('/api/adoption/favorites');
    return data;
  },

  async submitApplication(payload) {
    const { data } = await api.post('/api/adoption/apply', payload);
    return data;
  },
};

import api from './api';

export const contentService = {
  async getStories() {
    const { data } = await api.get('/api/stories');
    return data;
  },

  async getArticles() {
    const { data } = await api.get('/api/articles');
    return data;
  },
};

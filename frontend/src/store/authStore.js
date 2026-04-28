import { create } from 'zustand';
import { authService } from '../services';

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  hydrated: false,

  setUser: (user) => set({ user }),

  bootstrap: async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      set({ user: null, hydrated: true });
      return;
    }

    set({ loading: true });
    try {
      const response = await authService.getProfile();
      set({ user: response.data, hydrated: true, loading: false });
    } catch {
      localStorage.removeItem('token');
      set({ user: null, hydrated: true, loading: false });
    }
  },

  login: async (email, password) => {
    set({ loading: true });
    const response = await authService.login(email, password);
    set({ user: response.data, loading: false, hydrated: true });
    return response;
  },

  register: async (payload) => {
    set({ loading: true });
    const response = await authService.register(payload);
    set({ user: response.data, loading: false, hydrated: true });
    return response;
  },

  logout: async () => {
    set({ loading: true });
    try {
      await authService.logout();
    } finally {
      set({ user: null, loading: false, hydrated: true });
    }
  },
}));

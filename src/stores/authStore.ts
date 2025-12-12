import { create } from 'zustand';
import { AuthUser } from '../types';

interface AuthStore {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
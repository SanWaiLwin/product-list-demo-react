import { create } from 'zustand';
import { DashboardStats, LoadingState } from '../types';
import { mockApiService } from '../services/mockApi';

interface DashboardStore {
  stats: DashboardStats | null;
  loadingState: LoadingState;
  error: string | null;
  lastUpdated: Date | null;

  // Actions
  fetchDashboardStats: () => Promise<void>;
  refreshStats: () => Promise<void>;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  stats: null,
  loadingState: 'idle',
  error: null,
  lastUpdated: null,

  fetchDashboardStats: async () => {
    try {
      set({ loadingState: 'loading', error: null });
      
      const stats = await mockApiService.getDashboardStats();
      
      set({
        stats,
        loadingState: 'success',
        lastUpdated: new Date(),
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch dashboard statistics';
      set({
        loadingState: 'error',
        error: errorMessage,
      });
    }
  },

  refreshStats: async () => {
    const { fetchDashboardStats } = get();
    await fetchDashboardStats();
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },
}));
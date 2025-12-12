import { create } from 'zustand';
import { User, UserQueryParams, CreateUserRequest, UpdateUserRequest, LoadingState } from '../types';
import { mockApiService } from '../services/mockApi';

interface UserStore {
  users: User[];
  editingUser: User | null;
  totalUsers: number;
  currentPage: number;
  totalPages: number;
  loadingState: LoadingState;
  error: string | null;
  selectedUsers: number[];

  // Actions
  fetchUsers: (params?: UserQueryParams) => Promise<void>;
  fetchUserById: (id: number) => Promise<void>;
  createUser: (userData: CreateUserRequest) => Promise<User>;
  updateUser: (id: number, userData: UpdateUserRequest) => Promise<User>;
  deleteUser: (id: number) => Promise<void>;
  bulkDeleteUsers: (ids: number[]) => Promise<void>;
  bulkUpdateUserStatus: (ids: number[], status: 'active' | 'inactive') => Promise<void>;
  
  // UI state management
  setSelectedUsers: (ids: number[]) => void;
  toggleUserSelection: (id: number) => void;
  selectAllUsers: () => void;
  clearSelection: () => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  editingUser: null,
  totalUsers: 0,
  currentPage: 1,
  totalPages: 1,
  loadingState: 'idle',
  error: null,
  selectedUsers: [],

  fetchUsers: async (params?: UserQueryParams) => {
    try {
      set({ loadingState: 'loading', error: null });
      
      const response = await mockApiService.getUsers(params);
      
      set({
        users: response.data,
        totalUsers: response.total,
        currentPage: response.page,
        totalPages: response.totalPages,
        loadingState: 'success',
        selectedUsers: [], // Clear selection when fetching new data
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch users';
      set({
        loadingState: 'error',
        error: errorMessage,
      });
    }
  },

  fetchUserById: async (id: number) => {
    try {
      set({ loadingState: 'loading', error: null });
      
      const user = await mockApiService.getUserById(id);
      
      set({
        editingUser: user,
        loadingState: 'success',
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user';
      set({
        loadingState: 'error',
        error: errorMessage,
        editingUser: null,
      });
    }
  },

  createUser: async (userData: CreateUserRequest) => {
    try {
      set({ loadingState: 'loading', error: null });
      
      const newUser = await mockApiService.createUser(userData);
      
      // Add the new user to the current list
      set((state) => ({
        users: [newUser, ...state.users],
        totalUsers: state.totalUsers + 1,
        loadingState: 'success',
      }));
      
      return newUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create user';
      set({
        loadingState: 'error',
        error: errorMessage,
      });
      throw error;
    }
  },

  updateUser: async (id: number, userData: UpdateUserRequest) => {
    try {
      set({ loadingState: 'loading', error: null });
      
      const updatedUser = await mockApiService.updateUser(id, userData);
      
      // Update the user in the current list
      set((state) => ({
        users: state.users.map(user => 
          user.id === id ? updatedUser : user
        ),
        editingUser: state.editingUser?.id === id ? updatedUser : state.editingUser,
        loadingState: 'success',
      }));
      
      return updatedUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update user';
      set({
        loadingState: 'error',
        error: errorMessage,
      });
      throw error;
    }
  },

  deleteUser: async (id: number) => {
    try {
      set({ loadingState: 'loading', error: null });
      
      await mockApiService.deleteUser(id);
      
      // Remove the user from the current list
      set((state) => ({
        users: state.users.filter(user => user.id !== id),
        totalUsers: state.totalUsers - 1,
        selectedUsers: state.selectedUsers.filter(userId => userId !== id),
        loadingState: 'success',
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete user';
      set({
        loadingState: 'error',
        error: errorMessage,
      });
      throw error;
    }
  },

  bulkDeleteUsers: async (ids: number[]) => {
    try {
      set({ loadingState: 'loading', error: null });
      
      await mockApiService.bulkDeleteUsers(ids);
      
      // Remove the users from the current list
      set((state) => ({
        users: state.users.filter(user => !ids.includes(user.id)),
        totalUsers: state.totalUsers - ids.length,
        selectedUsers: [],
        loadingState: 'success',
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete users';
      set({
        loadingState: 'error',
        error: errorMessage,
      });
      throw error;
    }
  },

  bulkUpdateUserStatus: async (ids: number[], status: 'active' | 'inactive') => {
    try {
      set({ loadingState: 'loading', error: null });
      
      await mockApiService.bulkUpdateUserStatus(ids, status);
      
      // Update the users in the current list
      set((state) => ({
        users: state.users.map(user => 
          ids.includes(user.id) 
            ? { ...user, status, updated_at: new Date().toISOString() }
            : user
        ),
        selectedUsers: [],
        loadingState: 'success',
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update user status';
      set({
        loadingState: 'error',
        error: errorMessage,
      });
      throw error;
    }
  },

  setSelectedUsers: (ids: number[]) => {
    set({ selectedUsers: ids });
  },

  toggleUserSelection: (id: number) => {
    set((state) => ({
      selectedUsers: state.selectedUsers.includes(id)
        ? state.selectedUsers.filter(userId => userId !== id)
        : [...state.selectedUsers, id],
    }));
  },

  selectAllUsers: () => {
    set((state) => ({
      selectedUsers: state.users.map(user => user.id),
    }));
  },

  clearSelection: () => {
    set({ selectedUsers: [] });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },
}));
import { create } from 'zustand';
import { Product, ProductsResponse, ProductQueryParams, CreateProductRequest, UpdateProductRequest, LoadingState } from '../types';
import { productApiService } from '../services/productApi';

interface ProductStore {
  products: Product[];
  editingProduct: Product | null;
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  loadingState: LoadingState;
  error: string | null;

  fetchProducts: (params?: ProductQueryParams) => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  createProduct: (data: CreateProductRequest) => Promise<Product>;
  updateProduct: (id: string, data: UpdateProductRequest) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  editingProduct: null,
  totalProducts: 0,
  currentPage: 1,
  totalPages: 1,
  loadingState: 'idle',
  error: null,

  fetchProducts: async (params?: ProductQueryParams) => {
    try {
      set({ loadingState: 'loading', error: null });
      const res: ProductsResponse = await productApiService.getProducts({ page: params?.page ?? 1, limit: params?.limit ?? 10, search: params?.search, sortBy: params?.sortBy, sortOrder: params?.sortOrder });
      set({ products: res.data, totalProducts: res.total, currentPage: res.page, totalPages: res.totalPages, loadingState: 'success' });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to fetch products';
      set({ loadingState: 'error', error: msg });
    }
  },

  fetchProductById: async (id: string) => {
    try {
      set({ loadingState: 'loading', error: null });
      const p = await productApiService.getProductById(id);
      set({ editingProduct: p, loadingState: 'success' });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to fetch product';
      set({ loadingState: 'error', error: msg, editingProduct: null });
    }
  },

  createProduct: async (data: CreateProductRequest) => {
    try {
      set({ loadingState: 'loading', error: null });
      const created = await productApiService.createProduct(data);
      set((state) => ({ products: [created, ...state.products], totalProducts: state.totalProducts + 1, loadingState: 'success' }));
      return created;
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to create product';
      set({ loadingState: 'error', error: msg });
      throw e;
    }
  },

  updateProduct: async (id: string, data: UpdateProductRequest) => {
    try {
      set({ loadingState: 'loading', error: null });
      const updated = await productApiService.updateProduct(id, data);
      set((state) => ({ products: state.products.map(p => p.id === id ? updated : p), editingProduct: state.editingProduct?.id === id ? updated : state.editingProduct, loadingState: 'success' }));
      return updated;
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to update product';
      set({ loadingState: 'error', error: msg });
      throw e;
    }
  },

  deleteProduct: async (id: string) => {
    try {
      set({ loadingState: 'loading', error: null });
      await productApiService.deleteProduct(id);
      set((state) => ({ products: state.products.filter(p => p.id !== id), totalProducts: Math.max(0, state.totalProducts - 1), loadingState: 'success' }));
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to delete product';
      set({ loadingState: 'error', error: msg });
      throw e;
    }
  },

  clearError: () => set({ error: null }),
}));

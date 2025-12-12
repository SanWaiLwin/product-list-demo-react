import { Product, ProductsResponse, ProductQueryParams, CreateProductRequest, UpdateProductRequest } from '@/types';
import { mockApiService } from '@/services/mockApi';

const BASE = '/api';

async function tryBackend<T>(fn: () => Promise<T>, fallback: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (_e) {
    return await fallback();
  }
}

function qs(params: Record<string, any>) {
  const s = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') s.append(k, String(v));
  });
  return s.toString();
}

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}

export const productApiService = {
  async getProducts(params: ProductQueryParams = {}): Promise<ProductsResponse> {
    return tryBackend(
      async () => {
        const q = qs({ page: params.page ?? 1, limit: params.limit ?? 10, search: params.search, sortBy: params.sortBy, sortOrder: params.sortOrder });
        const res = await fetch(`${BASE}/products?${q}`);
        return await json<ProductsResponse>(res);
      },
      async () => mockApiService.getProducts(params)
    );
  },

  async getProductById(id: string): Promise<Product> {
    return tryBackend(
      async () => {
        const res = await fetch(`${BASE}/products/${id}`);
        return await json<Product>(res);
      },
      async () => mockApiService.getProductById(id)
    );
  },

  async createProduct(data: CreateProductRequest): Promise<Product> {
    return tryBackend(
      async () => {
        const res = await fetch(`${BASE}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        return await json<Product>(res);
      },
      async () => mockApiService.createProduct(data)
    );
  },

  async updateProduct(id: string, data: UpdateProductRequest): Promise<Product> {
    return tryBackend(
      async () => {
        const res = await fetch(`${BASE}/products/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        return await json<Product>(res);
      },
      async () => mockApiService.updateProduct(id, data)
    );
  },

  async deleteProduct(id: string): Promise<void> {
    return tryBackend(
      async () => {
        const res = await fetch(`${BASE}/products/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      },
      async () => mockApiService.deleteProduct(id)
    );
  },
};


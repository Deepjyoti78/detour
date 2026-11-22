import { apiClient } from '@/lib/api-client';
import type {
  ProductFilters,
  ProductsResponse,
  ProductByIdResponse,
  ProductMutationPayload
} from './types';

export async function getProducts(filters: ProductFilters): Promise<ProductsResponse> {
  const params = new URLSearchParams();
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));
  if (filters.categories) params.set('categories', filters.categories);
  if (filters.search) params.set('search', filters.search);
  if (filters.sort) params.set('sort', filters.sort);

  return apiClient<ProductsResponse>(`/products?${params.toString()}`);
}

export async function getProductById(id: number | string): Promise<ProductByIdResponse> {
  return apiClient<ProductByIdResponse>(`/products/${id}`);
}

export async function createProduct(data: ProductMutationPayload) {
  return apiClient<{ success: boolean; product: unknown }>('/products', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'x-detour-operator-dev': 'true',
    },
  });
}

export async function updateProduct(id: number | string, data: ProductMutationPayload) {
  return apiClient<{ success: boolean; product: unknown }>(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'x-detour-operator-dev': 'true',
    },
  });
}

export async function deleteProduct(id: number | string) {
  return apiClient<{ success: boolean }>(`/products/${id}`, {
    method: 'DELETE',
    headers: {
      'x-detour-operator-dev': 'true',
    },
  });
}

import { ProductEntity } from '@/types/ProductCard';
import { apiClient } from './client';

export const productsApi = {
  getProducts: async ({
    page = 1,
    pageSize = 20,
  }: { page?: number; pageSize?: number } = {}) => {
    const queryParams = [];
    if (page) queryParams.push(`page=${page}`);
    if (pageSize) queryParams.push(`pageSize=${pageSize}`);

    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';

    return apiClient.get<{
      page: number;
      amount: number;
      total: number;
      items: Array<ProductEntity>;
    }>(`products${queryString}`);
  },
};

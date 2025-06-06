import { OrderEntity } from '@/types/Order';
import { apiClient } from './client';

export const orderApi = {
  postOrder: async (data: OrderEntity) => {
    return apiClient.post<OrderEntity[]>('order', {
      phone: data.phone,
      cart: data.cart,
    });
  },
};

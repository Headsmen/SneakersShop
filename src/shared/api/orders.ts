import { apiClient } from './client';
import type { OrderData } from '../types';

export const ordersApi = {
  create: async (orderData: OrderData): Promise<OrderData> => {
    const { data } = await apiClient.post<OrderData>('/busketinto', {
      ...orderData,
      createdAt: new Date().toISOString(),
    });
    return data;
  },
};

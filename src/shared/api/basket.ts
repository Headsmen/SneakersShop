import { apiClient } from './client';
import { createBasketItemFromSneaker } from '../lib/factories';
import type { BasketItem, SneakerItem } from '../types';

export const basketApi = {
  getAll: async (): Promise<BasketItem[]> => {
    const { data } = await apiClient.get<BasketItem[]>('/orders');
    return data;
  },

  add: async (item: SneakerItem): Promise<BasketItem> => {
    const payload = createBasketItemFromSneaker(item);
    const { data } = await apiClient.post<BasketItem>('/orders', payload);
    return data;
  },

  remove: async (id: number): Promise<void> => {
    await apiClient.delete(`/orders/${id}`);
  },

  findByItemId: async (itemId: number): Promise<BasketItem | undefined> => {
    const { data } = await apiClient.get<BasketItem[]>('/orders');
    return data.find(item => item.itemId === itemId || item.parentId === itemId);
  },
};

import { apiClient } from './client';
import type { SneakerItem } from '../types';

export const itemsApi = {
  getAll: async (): Promise<SneakerItem[]> => {
    const { data } = await apiClient.get<SneakerItem[]>('/items');

    let itemsData = data;
    if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
      itemsData = data[0] as SneakerItem[];
    }

    return itemsData.filter(item =>
      item && item.title && item.price && item.imageUrl
    );
  },
};

import { apiClient } from './client';
import { createFavoriteItemFromSneaker } from '../lib/factories';
import type { FavoriteItem, SneakerItem } from '../types';

export const favoritesApi = {
  getAll: async (): Promise<FavoriteItem[]> => {
    const { data } = await apiClient.get<FavoriteItem[]>('/favorites');
    return data;
  },

  add: async (item: SneakerItem): Promise<FavoriteItem> => {
    const payload = createFavoriteItemFromSneaker(item);
    const { data } = await apiClient.post<FavoriteItem>('/favorites', payload);
    return data;
  },

  remove: async (id: number): Promise<void> => {
    await apiClient.delete(`/favorites/${id}`);
  },

  findByItemId: async (itemId: number): Promise<FavoriteItem | undefined> => {
    const { data } = await apiClient.get<FavoriteItem[]>('/favorites');
    return data.find(fav => fav.itemId === itemId || fav.parentId === itemId);
  },
};

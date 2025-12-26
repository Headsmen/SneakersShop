import { ref, computed } from 'vue';
import { favoritesApi } from '@/shared/api';
import type { FavoriteItem, SneakerItem } from '@/shared/types';

export const useFavorites = () => {
  const items = ref<FavoriteItem[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const count = computed(() => items.value.length);

  const fetchFavorites = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await favoritesApi.getAll();
      items.value = data;
    } catch (err) {
      console.error('Ошибка при загрузке избранного:', err);
      error.value = 'Не удалось загрузить избранное';
    } finally {
      isLoading.value = false;
    }
  };

  const addToFavorites = async (item: SneakerItem) => {
    try {
      const data = await favoritesApi.add(item);
      items.value.push(data);
    } catch (err) {
      console.error('Ошибка при добавлении в избранное:', err);
      throw err;
    }
  };

  const removeFromFavorites = async (itemId: number) => {
    try {
      const favoriteItem = await favoritesApi.findByItemId(itemId);

      if (favoriteItem) {
        await favoritesApi.remove(favoriteItem.id);
        items.value = items.value.filter(fav => fav.id !== favoriteItem.id);
      }
    } catch (err) {
      console.error('Ошибка при удалении из избранного:', err);
      throw err;
    }
  };

  const isFavorite = (itemId: number): boolean => {
    return items.value.some(fav => fav.itemId === itemId || fav.parentId === itemId);
  };

  return {
    items,
    count,
    isLoading,
    error,
    fetchFavorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
};

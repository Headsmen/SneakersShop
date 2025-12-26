import { ref, computed } from 'vue';
import { itemsApi } from '@/shared/api';
import type { SneakerItem, SortBy } from '@/shared/types';

export const useProducts = () => {
  const items = ref<SneakerItem[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const searchQuery = ref('');
  const sortBy = ref<SortBy>('title');

  const fetchProducts = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await itemsApi.getAll();
      items.value = data;
    } catch (err) {
      console.error('Ошибка при загрузке товаров:', err);
      error.value = 'Не удалось загрузить товары';
    } finally {
      isLoading.value = false;
    }
  };

  const filteredItems = computed(() => {
    let result = [...items.value];

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(item =>
        item.title.toLowerCase().includes(query)
      );
    }

    if (sortBy.value === 'title' || sortBy.value === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortBy.value === 'price') {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy.value === '-price') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  });

  const setSearchQuery = (query: string) => {
    searchQuery.value = query;
  };

  const setSortBy = (sort: SortBy) => {
    sortBy.value = sort;
  };

  return {
    items,
    filteredItems,
    isLoading,
    error,
    searchQuery,
    sortBy,
    fetchProducts,
    setSearchQuery,
    setSortBy,
  };
};

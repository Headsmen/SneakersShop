import { ref, computed } from 'vue';
import { basketApi } from '@/shared/api';
import type { BasketItem, SneakerItem } from '@/shared/types';

export const useCart = () => {
  const items = ref<BasketItem[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const count = computed(() => items.value.length);

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price, 0);
  });

  const taxPrice = computed(() => {
    return Math.round(totalPrice.value * 0.05);
  });

  const fetchCart = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await basketApi.getAll();
      items.value = data;
    } catch (err) {
      console.error('Ошибка при загрузке корзины:', err);
      error.value = 'Не удалось загрузить корзину';
    } finally {
      isLoading.value = false;
    }
  };

  const addToCart = async (item: SneakerItem) => {
    try {
      const data = await basketApi.add(item);
      items.value.push(data);
    } catch (err) {
      console.error('Ошибка при добавлении в корзину:', err);
      throw err;
    }
  };

  const removeFromCart = async (itemId: number) => {
    try {
      const basketItem = await basketApi.findByItemId(itemId);

      if (basketItem) {
        await basketApi.remove(basketItem.id);
        items.value = items.value.filter(item => item.id !== basketItem.id);
      }
    } catch (err) {
      console.error('Ошибка при удалении из корзины:', err);
      throw err;
    }
  };

  const clearCart = async () => {
    const itemsToRemove = [...items.value];

    for (const basketItem of itemsToRemove) {
      try {
        await basketApi.remove(basketItem.id);
      } catch (err) {
        console.error('Ошибка при удалении товара из корзины:', err);
      }
    }

    items.value = [];
  };

  const isInCart = (itemId: number): boolean => {
    return items.value.some(item => item.itemId === itemId || item.parentId === itemId);
  };

  return {
    items,
    count,
    totalPrice,
    taxPrice,
    isLoading,
    error,
    fetchCart,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
  };
};

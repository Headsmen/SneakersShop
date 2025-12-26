import { ref, computed } from 'vue';
import { useProducts } from '@/features/products/model/useProducts';
import { useCart } from '@/features/cart/model/useCart';
import { useFavorites } from '@/features/favorites/model/useFavorites';
import type { PageType, SneakerItem } from '@/shared/types';

export const useApp = () => {
  const products = useProducts();
  const cart = useCart();
  const favorites = useFavorites();

  const currentPage = ref<PageType>('home');
  const isDrawerOpen = ref(false);

  const initializeApp = async () => {
    await Promise.all([
      products.fetchProducts(),
      cart.fetchCart(),
      favorites.fetchFavorites(),
    ]);

    updateItemStates();
  };

  const updateItemStates = () => {
    products.items.value.forEach((item: SneakerItem) => {
      item.isFavorite = favorites.isFavorite(item.id);
      item.isAdded = cart.isInCart(item.id);
    });
  };

  const toggleFavorite = async (itemId: number) => {
    const item = products.items.value.find((i) => i.id === itemId);
    if (!item) return;

    try {
      if (favorites.isFavorite(itemId)) {
        await favorites.removeFromFavorites(itemId);
        item.isFavorite = false;
      } else {
        await favorites.addToFavorites(item);
        item.isFavorite = true;
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  const toggleCart = async (itemId: number) => {
    const item = products.items.value.find((i) => i.id === itemId);
    if (!item) return;

    try {
      if (cart.isInCart(itemId)) {
        await cart.removeFromCart(itemId);
        item.isAdded = false;
      } else {
        await cart.addToCart(item);
        item.isAdded = true;
      }
    } catch (err) {
      console.error('Error toggling cart:', err);
    }
  };

  const navigateTo = (page: PageType) => {
    currentPage.value = page;
  };

  const openDrawer = () => {
    isDrawerOpen.value = true;
  };

  const closeDrawer = () => {
    isDrawerOpen.value = false;
  };

  const navigateToOrders = () => {
    closeDrawer();
    navigateTo('orders');
  };

  const cartItemIds = computed(() => {
    return cart.items.value.map(item => item.itemId);
  });

  return {
    products,
    cart,
    favorites,
    currentPage,
    isDrawerOpen,
    cartItemIds,
    initializeApp,
    updateItemStates,
    toggleFavorite,
    toggleCart,
    navigateTo,
    openDrawer,
    closeDrawer,
    navigateToOrders,
  };
};

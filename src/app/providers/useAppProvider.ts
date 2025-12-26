import { onMounted } from 'vue';
import { useApp } from '@/shared/lib/useApp';
import { useOrders } from '@/features/orders/model';

export const useAppProvider = () => {
  const app = useApp();
  const orders = useOrders();

  const handleNavigateToHome = () => {
    app.navigateTo('home');
  };

  const handleNavigateToFavorites = () => {
    app.navigateTo('favorites');
  };

  const handleOpenCart = () => {
    app.openDrawer();
  };

  const handleSubmitOrder = async () => {
    try {
      await orders.submitOrder(
        app.cart.items.value,
        app.cart.totalPrice.value,
        app.cart.taxPrice.value
      );

      await app.cart.clearCart();
      app.updateItemStates();

      app.navigateTo('home');
    } catch (err) {
      console.error('Error submitting order:', err);
    }
  };

  onMounted(() => {
    app.initializeApp();
  });

  return {
    app,
    orders,
    handleNavigateToHome,
    handleNavigateToFavorites,
    handleOpenCart,
    handleSubmitOrder,
  };
};

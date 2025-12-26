import { ref, computed } from 'vue';
import { ordersApi } from '@/shared/api';
import type { OrderData, BasketItem } from '@/shared/types';

export const useOrders = () => {
  const recipient = ref('');
  const city = ref('');
  const phone = ref('');
  const isSubmitting = ref(false);
  const error = ref<string | null>(null);

  const isFormValid = computed(() => {
    return (
      recipient.value.trim() !== '' &&
      city.value.trim() !== '' &&
      phone.value.trim() !== ''
    );
  });

  const submitOrder = async (
    items: BasketItem[],
    totalPrice: number,
    taxPrice: number
  ): Promise<void> => {
    if (!isFormValid.value) {
      error.value = 'Заполните все поля';
      return;
    }

    isSubmitting.value = true;
    error.value = null;

    try {
      const orderData: OrderData = {
        recipient: recipient.value.trim(),
        city: city.value.trim(),
        phone: phone.value.trim(),
        items,
        totalPrice,
        taxPrice,
      };

      await ordersApi.create(orderData);

      resetForm();
    } catch (err) {
      console.error('Ошибка при оформлении заказа:', err);
      error.value = 'Не удалось оформить заказ';
      throw err;
    } finally {
      isSubmitting.value = false;
    }
  };

  const resetForm = () => {
    recipient.value = '';
    city.value = '';
    phone.value = '';
    error.value = null;
  };

  return {
    recipient,
    city,
    phone,
    isFormValid,
    isSubmitting,
    error,
    submitOrder,
    resetForm,
  };
};

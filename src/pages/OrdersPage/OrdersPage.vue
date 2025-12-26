<script setup lang="ts">
import { CartList } from '@/widgets/Cart';
import { OrderCheckout } from '@/features/orders/ui';
import type { BasketItem } from '@/shared/types';
import arrowImg from '@/assets/arrow.svg';

interface Props {
  items: BasketItem[];
  totalPrice: number;
  taxPrice: number;
  recipient: string;
  city: string;
  phone: string;
  isFormValid: boolean;
  isSubmitting: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  'update:recipient': [value: string];
  'update:city': [value: string];
  'update:phone': [value: string];
  'remove-item': [itemId: number];
  submit: [];
  'navigate-back': [];
}>();
</script>

<template>
  <div class="orders-page">
    <div class="orders-page__header">
      <button @click="emit('navigate-back')" class="orders-page__back">
        <img :src="arrowImg" alt="Back" />
      </button>
      <h1 class="orders-page__title">Оформление заказа</h1>
    </div>

    <div class="orders-page__content">
      <div class="orders-page__cart">
        <h2>Ваш заказ</h2>
        <CartList
          :items="items"
          @remove-item="emit('remove-item', $event)"
        />
      </div>

      <div class="orders-page__checkout">
        <OrderCheckout
          :recipient="recipient"
          :city="city"
          :phone="phone"
          :items="items"
          :total-price="totalPrice"
          :tax-price="taxPrice"
          :is-form-valid="isFormValid"
          :is-submitting="isSubmitting"
          @update:recipient="emit('update:recipient', $event)"
          @update:city="emit('update:city', $event)"
          @update:phone="emit('update:phone', $event)"
          @submit="emit('submit')"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.orders-page {
  padding: 40px 20px;
}

.orders-page__header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
}

.orders-page__back {
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  transition: opacity 0.2s;
}

.orders-page__back:hover {
  opacity: 0.7;
}

.orders-page__back img {
  width: 24px;
  height: 24px;
}

.orders-page__title {
  font-size: 32px;
  font-weight: 700;
}

.orders-page__content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}

.orders-page__cart h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
}

@media (min-width: 768px) {
  .orders-page {
    padding: 40px 30px;
  }

  .orders-page__content {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .orders-page {
    padding: 40px 60px;
  }
}
</style>

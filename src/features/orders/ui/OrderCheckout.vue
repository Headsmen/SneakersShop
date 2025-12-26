<script setup lang="ts">
import { UiInput, UiButton } from '@/shared/ui';
import type { BasketItem } from '@/shared/types';

interface Props {
  recipient: string;
  city: string;
  phone: string;
  items: BasketItem[];
  totalPrice: number;
  taxPrice: number;
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
}>();
</script>

<template>
  <div class="order-checkout">
    <h2 class="order-checkout__title">Оформление заказа</h2>

    <div class="order-checkout__form">
      <div class="order-checkout__field">
        <label>Получатель:</label>
        <UiInput
          :model-value="recipient"
          @update:model-value="emit('update:recipient', $event)"
          placeholder="Введите имя"
        />
      </div>

      <div class="order-checkout__field">
        <label>Город:</label>
        <UiInput
          :model-value="city"
          @update:model-value="emit('update:city', $event)"
          placeholder="Введите город"
        />
      </div>

      <div class="order-checkout__field">
        <label>Телефон:</label>
        <UiInput
          :model-value="phone"
          @update:model-value="emit('update:phone', $event)"
          placeholder="+7 (___) ___-__-__"
          type="tel"
        />
      </div>
    </div>

    <div class="order-checkout__summary">
      <div class="order-checkout__row">
        <span>Итого:</span>
        <div class="order-checkout__divider"></div>
        <span>{{ totalPrice }} руб.</span>
      </div>
      <div class="order-checkout__row">
        <span>Налог 5%:</span>
        <div class="order-checkout__divider"></div>
        <span>{{ taxPrice }} руб.</span>
      </div>
    </div>

    <UiButton
      :disabled="!isFormValid || isSubmitting"
      @click="emit('submit')"
    >
      {{ isSubmitting ? 'Оформление...' : 'Оформить заказ' }}
    </UiButton>
  </div>
</template>

<style scoped>
.order-checkout {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-checkout__title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
}

.order-checkout__form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.order-checkout__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.order-checkout__field label {
  font-size: 14px;
  font-weight: 500;
  color: #000;
}

.order-checkout__summary {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.order-checkout__row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.order-checkout__divider {
  flex: 1;
  border-bottom: 1px dashed #dfdfdf;
}
</style>

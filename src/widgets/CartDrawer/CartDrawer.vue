<script setup lang="ts">
import { CartList } from '@/widgets/Cart';
import { UiButton } from '@/shared/ui';
import type { BasketItem } from '@/shared/types';
import removeBtnImg from '@/assets/RemoveBtn.svg';
import emptyCartImg from '@/assets/image 6.svg';

interface Props {
  isOpen: boolean;
  items: BasketItem[];
  totalPrice: number;
  taxPrice: number;
}

defineProps<Props>();

const emit = defineEmits<{
  close: [];
  'remove-item': [itemId: number];
  'go-to-order': [];
}>();

const handleClose = () => {
  emit('close');
};

const handleRemoveItem = (itemId: number) => {
  emit('remove-item', itemId);
};

const handleGoToOrder = () => {
  emit('go-to-order');
};
</script>

<template>
  <div v-if="isOpen" class="drawer-overlay" @click="handleClose">
    <div class="drawer" @click.stop>
      <div class="drawer__header">
        <h2 class="drawer__title">Корзина</h2>
        <button @click="handleClose" class="drawer__close">
          <img :src="removeBtnImg" alt="Close" />
        </button>
      </div>

      <div v-if="items.length === 0" class="drawer__empty">
        <img :src="emptyCartImg" alt="Empty cart" width="120" />
        <p class="drawer__empty-title">Корзина пустая</p>
        <p class="drawer__empty-text">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ</p>
      </div>

      <div v-else class="drawer__content">
        <CartList
          :items="items"
          @remove-item="handleRemoveItem"
        />

        <div class="drawer__footer">
          <div class="drawer__total">
            <div class="drawer__row">
              <span>Итого:</span>
              <div class="drawer__divider"></div>
              <span class="drawer__price">{{ totalPrice }} руб.</span>
            </div>
            <div class="drawer__row">
              <span>Налог 5%:</span>
              <div class="drawer__divider"></div>
              <span class="drawer__price">{{ taxPrice }} руб.</span>
            </div>
          </div>

          <UiButton @click="handleGoToOrder">
            Оформить заказ
          </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}

.drawer {
  width: 100%;
  max-width: 420px;
  background: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
}

.drawer__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  border-bottom: 1px solid #f3f3f3;
}

.drawer__title {
  font-size: 24px;
  font-weight: 700;
}

.drawer__close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  transition: opacity 0.2s;
}

.drawer__close:hover {
  opacity: 0.7;
}

.drawer__close img {
  width: 32px;
  height: 32px;
}

.drawer__empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
}

.drawer__empty-title {
  font-size: 22px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
}

.drawer__empty-text {
  font-size: 16px;
  color: #c4c4c4;
  max-width: 280px;
}

.drawer__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.drawer__content > :first-child {
  flex: 1;
  overflow-y: auto;
  padding: 20px 30px;
}

.drawer__footer {
  padding: 30px;
  border-top: 1px solid #f3f3f3;
  display: flex;
  flex-direction: column;
}

.drawer__total {
  margin-bottom: 24px;
}

.drawer__row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.drawer__divider {
  flex: 1;
  border-bottom: 1px dashed #dfdfdf;
}

.drawer__price {
  font-weight: 600;
}

@media (max-width: 480px) {
  .drawer {
    max-width: 100%;
  }

  .drawer__header,
  .drawer__footer {
    padding: 20px;
  }

  .drawer__content > :first-child {
    padding: 15px 20px;
  }
}
</style>

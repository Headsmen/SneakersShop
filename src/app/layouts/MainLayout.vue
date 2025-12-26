<script setup lang="ts">
import { Header } from '@/widgets/Header';
import { CartDrawer } from '@/widgets/CartDrawer';
import type { BasketItem } from '@/shared/types';

interface Props {
  cartCount: number;
  favoritesCount: number;
  totalPrice: number;
  isDrawerOpen: boolean;
  cartItems: BasketItem[];
  taxPrice: number;
}

defineProps<Props>();

const emit = defineEmits<{
  'navigate-to-favorites': [];
  'navigate-to-home': [];
  'open-cart': [];
  'close-drawer': [];
  'remove-item': [itemId: number];
  'go-to-order': [];
}>();
</script>

<template>
  <div class="main-layout">
    <Header
      :cart-count="cartCount"
      :favorites-count="favoritesCount"
      :total-price="totalPrice"
      @navigate-to-favorites="emit('navigate-to-favorites')"
      @open-cart="emit('open-cart')"
      @navigate-to-home="emit('navigate-to-home')"
    />

    <slot />

    <CartDrawer
      :is-open="isDrawerOpen"
      :items="cartItems"
      :total-price="totalPrice"
      :tax-price="taxPrice"
      @close="emit('close-drawer')"
      @remove-item="emit('remove-item', $event)"
      @go-to-order="emit('go-to-order')"
    />
  </div>
</template>

<style scoped>
.main-layout {
  width: 100%;
}
</style>

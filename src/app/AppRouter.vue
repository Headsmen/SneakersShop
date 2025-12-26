<script setup lang="ts">
import { HomePage } from '@/pages/HomePage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { OrdersPage } from '@/pages/OrdersPage';
import type { PageType, SneakerItem, SortBy, FavoriteItem, BasketItem } from '@/shared/types';

interface Props {
  currentPage: PageType;
  // Home page
  homeItems: SneakerItem[];
  searchQuery: string;
  sortBy: SortBy;
  isProductsLoading?: boolean;
  // Favorites page
  favoriteItems: FavoriteItem[];
  cartItemIds: number[];
  // Orders page
  orderItems: BasketItem[];
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
  'update:search-query': [value: string];
  'update:sort-by': [value: SortBy];
  'toggle-favorite': [itemId: number];
  'toggle-cart': [itemId: number];
  'navigate-back': [];
  'update:recipient': [value: string];
  'update:city': [value: string];
  'update:phone': [value: string];
  'remove-item': [itemId: number];
  'submit-order': [];
}>();
</script>

<template>
  <HomePage
    v-if="currentPage === 'home'"
    :items="homeItems"
    :search-query="searchQuery"
    :sort-by="sortBy"
    :is-loading="isProductsLoading"
    @update:search-query="emit('update:search-query', $event)"
    @update:sort-by="emit('update:sort-by', $event)"
    @toggle-favorite="emit('toggle-favorite', $event)"
    @toggle-cart="emit('toggle-cart', $event)"
  />

  <FavoritesPage
    v-else-if="currentPage === 'favorites'"
    :items="favoriteItems"
    :cart-item-ids="cartItemIds"
    @toggle-favorite="emit('toggle-favorite', $event)"
    @toggle-cart="emit('toggle-cart', $event)"
    @navigate-back="emit('navigate-back')"
  />

  <OrdersPage
    v-else-if="currentPage === 'orders'"
    :items="orderItems"
    :total-price="totalPrice"
    :tax-price="taxPrice"
    :recipient="recipient"
    :city="city"
    :phone="phone"
    :is-form-valid="isFormValid"
    :is-submitting="isSubmitting"
    @update:recipient="emit('update:recipient', $event)"
    @update:city="emit('update:city', $event)"
    @update:phone="emit('update:phone', $event)"
    @remove-item="emit('remove-item', $event)"
    @submit="emit('submit-order')"
    @navigate-back="emit('navigate-back')"
  />
</template>

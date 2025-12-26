<script setup lang="ts">
import { useAppProvider } from './providers';
import { MainLayout } from './layouts';
import AppRouter from './AppRouter.vue';

const {
  app,
  orders,
  handleNavigateToHome,
  handleNavigateToFavorites,
  handleOpenCart,
  handleSubmitOrder,
} = useAppProvider();
</script>

<template>
  <MainLayout
    :cart-count="app.cart.count.value"
    :favorites-count="app.favorites.count.value"
    :total-price="app.cart.totalPrice.value"
    :is-drawer-open="app.isDrawerOpen.value"
    :cart-items="app.cart.items.value"
    :tax-price="app.cart.taxPrice.value"
    @navigate-to-favorites="handleNavigateToFavorites"
    @navigate-to-home="handleNavigateToHome"
    @open-cart="handleOpenCart"
    @close-drawer="app.closeDrawer"
    @remove-item="app.toggleCart"
    @go-to-order="app.navigateToOrders"
  >
    <AppRouter
      :current-page="app.currentPage.value"
      :home-items="app.products.filteredItems.value"
      :search-query="app.products.searchQuery.value"
      :sort-by="app.products.sortBy.value"
      :is-products-loading="app.products.isLoading.value"
      :favorite-items="app.favorites.items.value"
      :cart-item-ids="app.cartItemIds.value"
      :order-items="app.cart.items.value"
      :total-price="app.cart.totalPrice.value"
      :tax-price="app.cart.taxPrice.value"
      :recipient="orders.recipient.value"
      :city="orders.city.value"
      :phone="orders.phone.value"
      :is-form-valid="orders.isFormValid.value"
      :is-submitting="orders.isSubmitting.value"
      @update:search-query="app.products.setSearchQuery"
      @update:sort-by="app.products.setSortBy"
      @toggle-favorite="app.toggleFavorite"
      @toggle-cart="app.toggleCart"
      @navigate-back="handleNavigateToHome"
      @update:recipient="(v: string) => (orders.recipient.value = v)"
      @update:city="(v: string) => (orders.city.value = v)"
      @update:phone="(v: string) => (orders.phone.value = v)"
      @remove-item="app.toggleCart"
      @submit-order="handleSubmitOrder"
    />
  </MainLayout>
</template>

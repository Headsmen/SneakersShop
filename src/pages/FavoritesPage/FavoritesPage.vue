<script setup lang="ts">
import { computed } from 'vue';
import { ProductList } from '@/widgets/ProductCatalog';
import { createSneakerFromFavorite } from '@/shared/lib/factories';
import type { FavoriteItem, SneakerItem } from '@/shared/types';
import arrowImg from '@/assets/arrow.svg';

interface Props {
  items: FavoriteItem[];
  cartItemIds?: number[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'toggle-favorite': [itemId: number];
  'toggle-cart': [itemId: number];
  'navigate-back': [];
}>();

const favoriteProducts = computed<SneakerItem[]>(() => {
  return props.items.map(item => {
    const isAdded = props.cartItemIds?.includes(item.itemId) || false;
    return createSneakerFromFavorite(item, isAdded);
  });
});
</script>

<template>
  <div class="favorites-page">
    <div class="favorites-page__header">
      <button @click="emit('navigate-back')" class="favorites-page__back">
        <img :src="arrowImg" alt="Back" />
      </button>
      <h1 class="favorites-page__title">Мои закладки</h1>
    </div>

    <div v-if="items.length === 0" class="favorites-page__empty">
      <p class="favorites-page__empty-title">Закладок нет :(</p>
      <p class="favorites-page__empty-text">Вы ничего не добавляли в закладки</p>
    </div>

    <ProductList
      v-else
      :items="favoriteProducts"
      @toggle-favorite="emit('toggle-favorite', $event)"
      @toggle-cart="emit('toggle-cart', $event)"
    />
  </div>
</template>

<style scoped>
.favorites-page {
  padding: 40px 20px;
}

.favorites-page__header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
}

.favorites-page__back {
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  transition: opacity 0.2s;
}

.favorites-page__back:hover {
  opacity: 0.7;
}

.favorites-page__back img {
  width: 24px;
  height: 24px;
}

.favorites-page__title {
  font-size: 32px;
  font-weight: 700;
}

.favorites-page__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 10px;
}

.favorites-page__empty-title {
  font-size: 22px;
  font-weight: 600;
  color: #000;
  margin-top: 20px;
}

.favorites-page__empty-text {
  font-size: 16px;
  color: #c4c4c4;
}

@media (min-width: 768px) {
  .favorites-page {
    padding: 40px 30px;
  }
}

@media (min-width: 1024px) {
  .favorites-page {
    padding: 40px 60px;
  }
}
</style>

<script setup lang="ts">
import type { SneakerItem } from '@/shared/types';
import ProductCard from './ProductCard.vue';
import ProductCardSkeleton from './ProductCardSkeleton.vue';

interface Props {
  items: SneakerItem[];
  isLoading?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  'toggle-favorite': [itemId: number];
  'toggle-cart': [itemId: number];
}>();

const handleToggleFavorite = (itemId: number) => {
  emit('toggle-favorite', itemId);
};

const handleToggleCart = (itemId: number) => {
  emit('toggle-cart', itemId);
};
</script>

<template>
  <div class="product-list">
    <template v-if="isLoading">
      <ProductCardSkeleton v-for="n in 8" :key="`skeleton-${n}`" />
    </template>

    <template v-else>
      <ProductCard
        v-for="item in items"
        :key="item.id"
        :title="item.title"
        :image-url="item.imageUrl"
        :price="item.price"
        :is-favorite="item.isFavorite || false"
        :is-added="item.isAdded || false"
        @toggle-favorite="handleToggleFavorite(item.id)"
        @toggle-cart="handleToggleCart(item.id)"
      />
    </template>
  </div>
</template>

<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(1, 2fr);
  gap: 30px;
  width: 100%;
  justify-items: center;
}

@media (min-width: 640px) {
  .product-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .product-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .product-list {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>

<script setup lang="ts">
import type { BasketItem } from '@/shared/types';
import CartItem from './CartItem.vue';

interface Props {
  items: BasketItem[];
}

defineProps<Props>();

const emit = defineEmits<{
  'remove-item': [itemId: number];
}>();

const handleRemoveItem = (itemId: number) => {
  emit('remove-item', itemId);
};
</script>

<template>
  <div class="cart-list">
    <CartItem
      v-for="item in items"
      :key="item.id"
      :title="item.title"
      :image-url="item.imageUrl"
      :price="item.price"
      @remove="handleRemoveItem(item.itemId)"
    />
  </div>
</template>

<style scoped>
.cart-list {
  display: flex;
  flex-direction: column;
}
</style>

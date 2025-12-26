<script setup lang="ts">
import removeBtnImg from '@/assets/RemoveBtn.svg';

interface Props {
  title: string;
  imageUrl: string;
  price: number;
}

defineProps<Props>();

const emit = defineEmits<{
  remove: [];
}>();

const handleRemove = () => {
  emit('remove');
};
</script>

<template>
  <div class="cart-item">
    <img :src="imageUrl" :alt="title" class="cart-item__image" />
    <div class="cart-item__info">
      <p class="cart-item__title">{{ title }}</p>
      <p class="cart-item__price">{{ price }} руб.</p>
    </div>
    <button @click="handleRemove" class="cart-item__remove">
      <img :src="removeBtnImg" alt="Remove" />
    </button>
  </div>
</template>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #f3f3f3;
}

.cart-item__image {
  width: 70px;
  height: 70px;
  object-fit: contain;
  border-radius: 10px;
  border: 1px solid #f3f3f3;
}

.cart-item__info {
  flex: 1;
}

.cart-item__title {
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 5px;
}

.cart-item__price {
  font-size: 14px;
  font-weight: 700;
}

.cart-item__remove {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  transition: opacity 0.2s;
}

.cart-item__remove:hover {
  opacity: 0.7;
}

.cart-item__remove img {
  width: 32px;
  height: 32px;
}
</style>

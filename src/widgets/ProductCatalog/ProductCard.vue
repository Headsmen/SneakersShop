<script setup lang="ts">
import likeActiveImg from '@/assets/likeActive.svg';
import likeDisActiveImg from '@/assets/likeDisActive.svg';
import addPlusImg from '@/assets/AddPlus.svg';
import checkedImg from '@/assets/Checked.svg';

interface Props {
  title: string;
  imageUrl: string;
  price: number;
  isFavorite: boolean;
  isAdded: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  'toggle-favorite': [];
  'toggle-cart': [];
}>();

const handleFavoriteClick = () => {
  emit('toggle-favorite');
};

const handleCartClick = () => {
  emit('toggle-cart');
};
</script>

<template>
  <div class="product-card">
    <div class="product-card__content">
      <button
        @click="handleFavoriteClick"
        class="product-card__favorite"
      >
        <img
          class="product-card__favorite-icon"
          :src="isFavorite ? likeActiveImg : likeDisActiveImg"
          alt="Favorite"
        />
      </button>
      <img :src="imageUrl" :alt="title" class="product-card__image" />

      <p class="product-card__title">
        {{ title }}
      </p>

      <p class="product-card__price-label">ЦЕНА:</p>
      <div class="product-card__actions">
        <p class="product-card__price">{{ price }} руб.</p>

        <button @click="handleCartClick" class="product-card__add">
          <img
            :src="!isAdded ? addPlusImg : checkedImg"
            alt="Add to cart"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  width: 100%;
  max-width: 280px;
  margin: 0 auto;
  border: 1px solid #f3f3f3;
  border-radius: 30px;
  padding: 20px;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.product-card__content {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.product-card__image {
  width: 100%;
  height: auto;
  max-width: 150px;
  margin: 20px auto;
}

.product-card__favorite,
.product-card__add {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s;
}

.product-card__favorite:hover,
.product-card__add:hover {
  transform: scale(1.1);
}

.product-card__favorite {
  align-self: flex-start;
}

.product-card__favorite-icon {
  width: 24px;
  height: 24px;
}

.product-card__title {
  font-size: 14px;
  font-weight: 400;
  min-height: 40px;
  margin-top: 10px;
}

.product-card__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: auto;
}

.product-card__price-label {
  font-size: 11px;
  font-weight: 500;
  color: #bdbdbd;
  margin-top: 14px;
}

.product-card__price {
  font-size: 14px;
  font-weight: 700;
}

.product-card__add img {
  width: 32px;
  height: 32px;
}

@media (min-width: 768px) {
  .product-card {
    max-width: 210px;
    border-radius: 35px;
    padding: 20px;
  }

  .product-card__image {
    max-width: 140px;
  }
}

@media (min-width: 1024px) {
  .product-card {
    max-width: 210px;
    border-radius: 40px;
    padding-left: 25px;
  }

  .product-card__image {
    max-width: 160px;
  }

  .product-card__favorite-icon {
    position: relative;
    top: 20px;
  }

  .product-card__actions {
    gap: 39px;
    position: relative;
    bottom: 10px;
  }
}
</style>

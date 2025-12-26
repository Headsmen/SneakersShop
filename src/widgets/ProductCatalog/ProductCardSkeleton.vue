<script setup lang="ts">
// Skeleton компонент для загрузки карточек товаров
</script>

<template>
  <div class="product-card-skeleton">
    <div class="product-card-skeleton__content">
      <div class="product-card-skeleton__favorite skeleton-shimmer"></div>
      <div class="product-card-skeleton__image skeleton-shimmer"></div>
      <div class="product-card-skeleton__title skeleton-shimmer"></div>
      <div class="product-card-skeleton__price-label skeleton-shimmer"></div>
      <div class="product-card-skeleton__actions">
        <div class="product-card-skeleton__price skeleton-shimmer"></div>
        <div class="product-card-skeleton__button skeleton-shimmer"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card-skeleton {
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

.product-card-skeleton__content {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.product-card-skeleton__favorite {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  align-self: flex-start;
}

.product-card-skeleton__image {
  width: 100%;
  height: 150px;
  max-width: 150px;
  margin: 20px auto;
  border-radius: 10px;
}

.product-card-skeleton__title {
  width: 100%;
  height: 40px;
  margin-top: 10px;
  border-radius: 5px;
}

.product-card-skeleton__price-label {
  width: 50px;
  height: 11px;
  margin-top: 14px;
  border-radius: 3px;
}

.product-card-skeleton__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: auto;
}

.product-card-skeleton__price {
  width: 70px;
  height: 20px;
  border-radius: 5px;
}

.product-card-skeleton__button {
  width: 32px;
  height: 32px;
  border-radius: 8px;
}

/* Shimmer animation */
.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    #f0f0f0 0%,
    #e0e0e0 50%,
    #f0f0f0 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@media (min-width: 768px) {
  .product-card-skeleton {
    max-width: 210px;
    border-radius: 35px;
    padding: 20px;
  }

  .product-card-skeleton__image {
    max-width: 140px;
  }
}

@media (min-width: 1024px) {
  .product-card-skeleton {
    max-width: 210px;
    border-radius: 40px;
    padding-left: 25px;
  }

  .product-card-skeleton__image {
    max-width: 160px;
  }

  .product-card-skeleton__favorite {
    position: relative;
    top: 20px;
  }

  .product-card-skeleton__actions {
    gap: 39px;
    position: relative;
    bottom: 10px;
  }
}
</style>

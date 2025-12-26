<script setup lang="ts">
import logoImg from '@/assets/logo.svg';
import groupImg from '@/assets/Group.svg';
import vectorImg from '@/assets/Vector.svg';
import unionImg from '@/assets/Union.svg';

interface Props {
  cartCount: number;
  favoritesCount: number;
  totalPrice: number;
}

defineProps<Props>();

const emit = defineEmits<{
  'navigate-to-favorites': [];
  'navigate-to-home': [];
  'open-cart': [];
}>();
</script>

<template>
  <header class="header-widget">
    <div class="header-widget__container">
      <div class="header-widget__logo" @click="emit('navigate-to-home')" style="cursor: pointer">
        <img :src="logoImg" alt="" width="40px" />
        <div>
          <p class="header-widget__title">REACT SNEAKERS</p>
          <p class="header-widget__subtitle">Магазин лучших кроссовок</p>
        </div>
      </div>

      <div class="header-widget__actions">
        <div class="header-widget__action" @click="emit('open-cart')">
          <div class="header-widget__icon-wrapper">
            <img :src="groupImg" alt="" />
            <span v-if="cartCount > 0" class="header-widget__badge">{{ cartCount }}</span>
          </div>
          <p>{{ totalPrice }} руб.</p>
        </div>

        <div class="header-widget__action" @click="emit('navigate-to-favorites')">
          <div class="header-widget__icon-wrapper">
            <img :src="vectorImg" alt="" />
            <span v-if="favoritesCount > 0" class="header-widget__badge">{{ favoritesCount }}</span>
          </div>
          <p>Закладки</p>
        </div>

        <div class="header-widget__action">
          <img :src="unionImg" alt="" />
          <p>Профиль</p>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-widget {
  padding-bottom: 20px;
  border-bottom: 1px solid #eaeaea;
}

.header-widget__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 16px;
  margin-right: 16px;
  gap: 16px;
  min-height: 41px;
  flex-wrap: wrap;
}

.header-widget__logo {
  display: flex;
  justify-content: start;
  gap: 10px;
  align-items: center;
}

.header-widget__title {
  font-size: 16px;
  font-weight: 700;
}

.header-widget__subtitle {
  font-size: 12px;
  font-weight: 400;
  color: #9d9d9d;
}

.header-widget__actions {
  display: flex;
  color: #5c5c5c;
  gap: 16px;
  justify-content: end;
  flex-wrap: wrap;
}

.header-widget__action {
  display: flex;
  gap: 8px;
  justify-content: end;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.2s;
}

.header-widget__action:hover {
  opacity: 0.7;
}

.header-widget__action p {
  font-size: 14px;
}

.header-widget__action img {
  width: 20px;
  height: 20px;
}

.header-widget__icon-wrapper {
  position: relative;
  display: inline-block;
}

.header-widget__badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ff6b6b;
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

@media (min-width: 768px) {
  .header-widget {
    padding-bottom: 35px;
  }

  .header-widget__container {
    margin-top: 30px;
    margin-left: 30px;
    margin-right: 30px;
  }

  .header-widget__title {
    font-size: 18px;
  }

  .header-widget__subtitle {
    font-size: 13px;
  }

  .header-widget__actions {
    gap: 24px;
  }

  .header-widget__action {
    gap: 10px;
  }
}

@media (min-width: 1024px) {
  .header-widget {
    padding-bottom: 45px;
  }

  .header-widget__container {
    margin-top: 43px;
    margin-left: 45px;
    margin-right: 60px;
  }

  .header-widget__title {
    font-size: 20px;
  }

  .header-widget__subtitle {
    font-size: 14px;
  }

  .header-widget__actions {
    gap: 32px;
  }
}
</style>

<script setup lang="ts">
import { UiInput } from '@/shared/ui';
import { ProductList } from '@/widgets/ProductCatalog';
import type { SneakerItem, SortBy } from '@/shared/types';

interface Props {
  items: SneakerItem[];
  searchQuery: string;
  sortBy: SortBy;
  isLoading?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  'update:search-query': [value: string];
  'update:sort-by': [value: SortBy];
  'toggle-favorite': [itemId: number];
  'toggle-cart': [itemId: number];
}>();

const sortOptions = [
  { value: 'title', label: 'По названию' },
  { value: 'price', label: 'По цене (дешевле)' },
  { value: '-price', label: 'По цене (дороже)' },
];
</script>

<template>
  <div class="home-page">
    <div class="home-page__header">
      <h1 class="home-page__title">Все кроссовки</h1>

      <div class="home-page__controls">
        <UiInput
          :model-value="searchQuery"
          @update:model-value="emit('update:search-query', $event)"
          placeholder="Поиск..."
          :with-search-icon="true"
        />

        <select
          :value="sortBy"
          @change="emit('update:sort-by', ($event.target as HTMLSelectElement).value as SortBy)"
          class="home-page__sort"
        >
          <option v-for="option in sortOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>

    <ProductList
      :items="items"
      :is-loading="isLoading"
      @toggle-favorite="emit('toggle-favorite', $event)"
      @toggle-cart="emit('toggle-cart', $event)"
    />
  </div>
</template>

<style scoped>
.home-page {
  padding: 40px 20px;
}

.home-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
}

.home-page__title {
  font-size: 32px;
  font-weight: 700;
}

.home-page__controls {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.home-page__sort {
  height: 45px;
  border: 1px solid #f3f3f3;
  border-radius: 10px;
  padding: 0 15px;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s;
}

.home-page__sort:focus {
  border-color: #a5d364;
}

@media (min-width: 768px) {
  .home-page {
    padding: 40px 30px;
  }
}

@media (min-width: 1024px) {
  .home-page {
    padding: 40px 60px;
  }
}
</style>

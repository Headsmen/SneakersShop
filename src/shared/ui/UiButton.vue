<script setup lang="ts">
interface Props {
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  variant: 'primary',
});

const emit = defineEmits<{
  click: [];
}>();

const handleClick = () => {
  emit('click');
};
</script>

<template>
  <button
    :class="['ui-button', `ui-button--${variant}`]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>КУПИТЬ</slot>
  </button>
</template>

<style scoped>
.ui-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border-radius: 110px;
  border: none;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.2s;
  padding: 0 32px;
}

.ui-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-button--primary {
  background-color: #a5d364;
  color: #fff;
}

.ui-button--primary:hover:not(:disabled) {
  opacity: 0.9;
}

.ui-button--secondary {
  background-color: #f3f3f3;
  color: #000;
}

.ui-button--secondary:hover:not(:disabled) {
  opacity: 0.8;
}
</style>

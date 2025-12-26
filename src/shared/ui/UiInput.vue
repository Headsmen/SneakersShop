<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: string;
  placeholder?: string;
  type?: string;
  withSearchIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  type: 'text',
  withSearchIcon: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const inputClasses = computed(() => ({
  'ui-input': true,
  'ui-input--with-search': props.withSearchIcon,
}));

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <input
    :class="inputClasses"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="handleInput"
  />
</template>

<style scoped>
.ui-input {
  height: 45px;
  border: 1px solid #f3f3f3;
  border-radius: 10px;
  color: #c4c4c4;
  padding: 0 15px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.ui-input:focus {
  border-color: #a5d364;
  color: #000;
}

.ui-input--with-search {
  background: url('../../assets/Searchim.svg') no-repeat left 15px center;
  padding-left: 45px;
  width: 250px;
}
</style>

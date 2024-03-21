<template>
  <div class="flex justify-self-end q-mb-none q-pa-xs q-mt-md bg-app-primary-900 border-app-primary-800 br-8" style="gap: 5px;">
    <span
      v-for="(option, index) in options"
      :key="index"
      @click="selectOption(option)"
      class="text-app-primary-100 q-py-xs q-px-sm br-6"
      :class="{ 'bg-app-primary' : selectedOption.value === option.value, 'text-app-primary' : selectedOption.value !== option.value }">
     {{ option.name }}
    </span>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref, toRefs } from 'vue';

export interface IOption {
  name: string;
  value: string;
}


export interface IOptionsSwitchProps {
  options: IOption[];
  defaultOption: string;
}

const emit = defineEmits(['update']);

const props = defineProps({
  options: {
    type: Array as () => IOption[],
    required: true
  },
  defaultOption: {
    type: String,
    required: true
  }
});

const { options, defaultOption } = toRefs(props);
const selectedOption = ref(options.value.find(option => option.value === defaultOption.value));

onMounted(() =>
{
  emit('update', selectedOption.value);
});

const selectOption = (option: { name: string, value: string }) =>
{
  selectedOption.value = option;
  emit('update', option);
};
</script>
>

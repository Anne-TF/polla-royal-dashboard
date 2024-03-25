<template>
  <div class="flex justify-self-end q-mb-none q-pa-xs q-mt-md bg-app-primary-900 border-app-primary-800 br-8" style="gap: 5px;">
    <q-btn flat size="sm" rounded :ripple="false"
      v-for="(option, index) in options"
      :key="index"
      @click="selectOption(option)"
      :disabled="option?.disabled"
      class="text-app-primary-100 q-py-xs q-px-sm br-6"
      :class="{ 'bg-app-primary' : selectedOption.value === option.value, 'text-app-primary' : selectedOption.value !== option.value }">
     {{ option.name }}
    </q-btn>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from 'vue';

export interface IOption {
  name: string;
  value: string;
  disabled?: boolean;
}

export interface IOptionsSwitchProps {
  options: IOption[];
  defaultOption: string;
}

const emit = defineEmits(['onSwitch']);

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
  emit('onSwitch', selectedOption.value.value);
});

const selectOption = (option: { name: string, value: string }) =>
{
  selectedOption.value = option;
  emit('onSwitch', option.value);
};

watch(defaultOption, (newValue) =>
{
  selectedOption.value = options.value.find(option => option.value === newValue);
});

</script>
>

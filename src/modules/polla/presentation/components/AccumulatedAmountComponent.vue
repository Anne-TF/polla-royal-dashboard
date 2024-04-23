<template>
  <div style="direction: ltr" >
    <div class="q-mb-none bg-app-primary-950 border-app-primary-800 q-px-sm q-py-xs br-8 row no-wrap items-end">
      <span class="text-app-primary-100 q-pr-sm" v-text="type" />
      <q-space />
      <div class="overflow-auto text-right hide-scrollbar">
        <span class="text-app-secondary"> {{ formattedAmount }} </span>
      </div>
      <span class="fs-12 ml-5">{{currency}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, toRefs, watch } from 'vue';

const props = defineProps({
  amount: {
    type: Number,
    required: true,
    default: 0
  },
  type: String,
  currency: {
    type: String,
    required: false,
    default: 'USD'
  }
});

const { amount, type, currency } = toRefs(props);
const displayedAmount = ref(amount.value);
const first = ref<boolean>(true);
const intervalId: number | null | NodeJS.Timeout = null;

watch(amount, (newAmount) =>
{
  displayedAmount.value = newAmount;
}, { deep: true });

onBeforeUnmount(() =>
{
  if (intervalId !== null)
  {
    clearInterval(intervalId);
  }
});

const formattedAmount = computed(() => displayedAmount.value.toLocaleString('de-DE', { minimumFractionDigits: 2 }));

// watch(amount, (newAmount) =>
// {
//
//   if (first.value)
//   {
//     displayedAmount.value = newAmount;
//     first.value = false
//     return;
//   }
//
//   if (intervalId !== null)
//   {
//     clearInterval(intervalId);
//   }
//
//   intervalId = setInterval(() =>
//   {
//     if (displayedAmount.value < newAmount)
//     {
//       displayedAmount.value++;
//     }
//     else if (displayedAmount.value > newAmount)
//     {
//       displayedAmount.value--;
//     }
//     else
//     {
//       clearInterval(intervalId);
//       intervalId = null;
//     }
//   }, 1);
// }, { deep: true });
</script>

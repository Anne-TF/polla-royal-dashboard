<template>
  <q-page-sticky expand position="top" class="wp-100 bg-app-primary q-py-md" style="margin-top: -10px">
    <q-toolbar class="flex column" style="align-items: end !important;">
      <div style="font-size: clamp(1.5vw, 3.5vw, 4vw)" class="flex wp-100 justify-between items-center q-mt-sm">
        <AppSelect/>
        <AccumulatedAmount :amount="amount"/>
      </div>

      <OptionSwitch :default-option="switchOptions.default" :options="switchOptions.options" @update="handleUpdate"/>
    </q-toolbar>
  </q-page-sticky>
</template>

<script setup lang="ts">
import { OptionSwitch, AppSelect } from '@common/components';
import { ref } from 'vue';
import AccumulatedAmount from './AccumulatedAmount.vue';


const amount = ref(5000);

const switchOptions = {
  default: 'races',
  options: [
    {
      name: 'Carreras',
      value: 'races'
    },
    {
      name: 'Historial',
      value: 'history'
    }
  ]
};

setTimeout(() =>
{
  amount.value = 5100;
}, 2000);

setTimeout(() =>
{
  amount.value = 5020;
}, 4000);

setTimeout(() =>
{
  amount.value = 4500;
}, 6000);

const handleUpdate = (selectedOption: string) =>
{
  console.log('La opción seleccionada es: ', selectedOption);
};

</script>

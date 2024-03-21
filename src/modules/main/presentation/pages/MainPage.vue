<template>
  <q-page class="q-px-md q-pb-md" style="padding-top: 10em;">
<!--    <q-card class="bg-app-secondary-2&#45;&#45;dark wp-100">-->
<!--      <q-item v-for="item in 100" :key="item">-->
<!--        <q-item-section>-->
<!--          <q-item-label>Item {{ item }}</q-item-label>-->
<!--        </q-item-section>-->
<!--      </q-item>-->
<!--    </q-card>-->

    <RaceCard v-for="race in races" :key="race.number" class="mb-10" :race/>

    <!-- THIS IS THE UPPER PART -->
    <q-page-sticky expand position="top" class="wp-100 bg-app-primary q-pb-md q-pt-sm">
      <q-toolbar class="flex column" style="align-items: end !important;">
        <div style="font-size: clamp(1.5vw, 3.5vw, 4vw)" class="flex wp-100 justify-between items-center q-mt-sm">
          <q-btn @click="parxRacingDialog = true" :ripple="false" class="text-medium fs-14" dense flat no-caps>
            Parx racing <span class="text-light fs-12 q-mx-sm">19/03</span>
            <q-icon size="1.2em" style="margin-top: -5px;" color="app-quaternary--dark" name="arrow_drop_down" />
            <q-separator class="wp-100" color="app-border--dark q-mt-xs" />
          </q-btn>

          <AccumulatedAmount :amount="amount"/>
        </div>

        <OptionSwitch :default-option="switchOptions.default" :options="switchOptions.options" @update="handleUpdate"/>
      </q-toolbar>
    </q-page-sticky>

    <q-dialog :maximized="$q.screen.lt.md" :position="$q.screen.lt.md ? 'bottom' : 'default'" v-model="parxRacingDialog">
      <q-card flat class="bg-app-secondary--dark"
              :class="{ 'hv-90' : $q.screen.height <= 800, 'hv-45' : $q.screen.height > 800 }"
              :style="`border-radius: ${$q.screen.lt.md ? '16px 16px 0 0' : '32px'} !important;`">
        <q-card-section class="hp-100">
          here goes the input
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { OptionSwitch } from '@common/components';
import { AccumulatedAmount, RaceCard } from '../components';
import { ref } from 'vue';

const parxRacingDialog = ref<boolean>(false);

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

const amount = ref(5000);

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

// const races = [{
//   number: 2,
//   horses: [
//     // generate 15 horses
//     ...Array.from({ length: 15 }, (_, i) => (i + 1))
//
//   ]
// }];

const races = [
  ...Array.from({ length: 6 }, (_, i) => ({
    number: i + 1,
    horses: [
      // generate 15 horses
      ...Array.from({ length: Math.floor(Math.random() * (15 - 2 + 1)) + 2 }, (__, ii) => (ii + 1))
    ]
  }))
]
</script>
```

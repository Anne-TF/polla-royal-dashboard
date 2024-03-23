<template>
  <q-card class="bg-app-primary-100 wp-100 br-16">
    <q-card-section class="fs-16 q-pt-sm q-pb-none q-px-dm">
      <span class="text-semi-bold text-app-primary">Carrera</span>
      <span class="text-app-secondary-700 q-mx-sm text-bold text-italic">
        <span class="fs-12">#</span>{{race.number}}
      </span>
      <CoinIcon custom-class="absolute" size="25px" color="app-secondary-700" v-if="selectedHorses.length" />
      <q-separator class="separator-app-primary-800" size="2px" style="width: 5.5em"/>
    </q-card-section>
    <q-item>
      <q-item-section>
        <div class="runners my-10">
          <RunnerBoxComponent
            v-for="(runner, index) in race.runners"
            :key="index"
            :number="runner.number"
            :selected="selectedHorses.includes(parseInt(runner.number, 10))"
            @onSelect="(number) => {
              if (number) {
                selectedHorses.push(number);
              } else {
                selectedHorses = selectedHorses.filter((h) => h !== parseInt(runner.number, 10));
              }
            }"
            :size="40"
          />
        </div>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script setup lang="ts">
import { defineProps, ref, toRefs } from 'vue';
import RunnerBoxComponent from './RunnerBoxComponent.vue';
import CoinIcon from '@common/icons/CoinIcon.vue';
import { Race } from '@modules/polla/domain/models';

const props = defineProps({
  race: {
    type: Object as () => Race,
    required: true
  }
});

const { race } = toRefs(props);

const selectedHorses = ref<number[]>([]);
</script>

<style scoped>
.runners {
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(7, 1fr);
  grid-gap: 10px 10px;
}
</style>



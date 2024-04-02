<template>
  <q-card class="bg-app-primary-100 wp-100 br-16 race" :class="{ 'success': (selectedRunners.length), 'error': (pollaStore.Betting && !selectedRunners.length) }">
    <q-card-section class="fs-16 q-pt-sm q-pb-none q-px-dm">
      <span class="text-semi-bold text-app-primary">Carrera</span>
      <span class="text-app-secondary-700 q-mx-sm text-bold text-italic">
        <span class="fs-12">#</span>{{race.number}}
      </span>
      <transition
        appear
        :duration="300"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <CoinIcon custom-class="absolute" size="25px" color="app-secondary-700" v-if="selectedRunners.length" />
      </transition>
      <q-separator class="separator-app-primary-800" size="2px" style="width: 5.5em"/>
    </q-card-section>
    <q-item>
      <q-item-section class="no-wrap">
        <div class="runners my-10">
          <RunnerBoxComponent
            v-for="(runner, index) in race.runners"
            :key="`${index}-${runner.id}`"
            :runner
            :modelValue="selectedRunners"
            :size="40"
          />
        </div>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script setup lang="ts">
import { defineProps, reactive, ref, toRefs, watch } from 'vue';
import RunnerBoxComponent from './RunnerBoxComponent.vue';
import CoinIcon from '@common/icons/CoinIcon.vue';
import { Race } from '@modules/polla/domain/models';
import { usePollaStore } from '@modules/polla/domain/store';

const props = defineProps({
  race: {
    type: Object as () => Race,
    required: true
  }
});

const { race } = toRefs(props);

const selectedRunners = ref<string[]>([]);

const pollaStore = usePollaStore();

watch(() => selectedRunners, (newValue) =>
{
  pollaStore.setBetOfRace(race.value.id, newValue.value);
}, { deep: true });

</script>

<style scoped>

.runners {
  display: grid;
  gap: 1rem;
  grid-auto-rows: 40px;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
}

.race {
  border: 4px solid rgba(255, 255, 255, 0);
  transition: border 0.3s ease-in-out;
}

.success {
  border: 4px solid #4CAF50;
}

.error {
  border: 4px solid #F44336;
}

</style>

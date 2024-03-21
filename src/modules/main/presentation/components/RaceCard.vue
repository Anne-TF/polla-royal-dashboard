<template>
  <q-card class="bg-app-secondary-2--dark wp-100 br-16">
    <q-item>
      <q-item-section>
        <div class="text-h6 q-mb-sm" style="border-bottom: 1px solid; width: fit-content;">
          Carrera #{{ race.number }}
          <q-icon name="your-icon-name" class="q-ml-md" />
        </div>
        <div class="horses my-10">
          <HorseBox
            v-for="(horse, index) in race.horses"
            :key="index"
            :number="horse"
            :size="40"
            :color="`#F0${index}`"
          />
        </div>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';
import HorseBox from './HorseBox.vue';

const props = defineProps({
  race: {
    type: Object,
    required: true
  }
});

const { race } = toRefs(props);
</script>

<style scoped>
.horses {
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(7, 1fr);
  grid-gap: 10px 10px;
}
</style>



<template>
    <RaceCardComponent v-show="!loading" v-for="race in races" :key="race.number" class="mb-10" :race/>
    <div v-if="loading">
        <q-skeleton class="mb-10" :count="3" :height="100" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Race } from '@modules/polla/domain/models';
import { usePollaStore } from '@modules/polla/domain/store';
import { GetRacesUseCase } from '@modules/polla/domain/useCases';
import { RaceCardComponent } from '@modules/polla/presentation/components';

const pollaStore = usePollaStore();
const loading = ref<boolean>(true);
const races = ref<Race[]>([]);

watch(() => pollaStore.GetSelectedHippodrome, async(newValue) =>
{
  if (newValue)
  {
    races.value = await GetRacesUseCase.handle(pollaStore.GetSelectedHippodrome);

    loading.value = false;
  }
}, { immediate: true, deep: true });

</script>


<template>
    <q-skeleton v-if="loading" b class="mb-10" :count="3" height="100" />
    <RaceCardComponent v-show="!loading" v-for="(race, index) in races" :key="`${index}-${race.id}`" class="mb-10" :race/>
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

watch(() => pollaStore.SelectedHippodrome, async(newValue) =>
{
  if (newValue)
  {
    races.value = await GetRacesUseCase.handle(newValue);
    loading.value = false;
  }
}, { immediate: true, deep: true });

</script>


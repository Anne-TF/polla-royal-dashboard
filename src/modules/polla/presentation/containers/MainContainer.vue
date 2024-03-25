<template>
    <div v-show="tapOptionSelected === 'play'" :key="`play-${hippodromeId}`">
      <q-skeleton v-if="loading" b class="mb-10" :count="3" height="100" />
      <RaceCardComponent v-show="!loading" v-for="(race, index) in races" :key="`${index}-${race.id}`" class="mb-10" :race/>
    </div>

    <div v-show="tapOptionSelected === 'history'" :key="`history-${hippodromeId}`">
      <q-skeleton v-if="loading" b class="mb-10" :count="3" height="100" />
      <span v-show="!loading">historial</span>
      <q-skeleton v-if="loading" b class="mb-10" :count="3" height="100" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Race } from '@modules/polla/domain/models';
import { usePollaStore } from '@modules/polla/domain/store';
import { GetRacesUseCase } from '@modules/polla/domain/useCases';
import { RaceCardComponent } from '@modules/polla/presentation/components';
import { OptionsTap } from '@modules/polla/domain/store/types';

const pollaStore = usePollaStore();
const loading = ref<boolean>(true);
const tapOptionSelected = ref<OptionsTap>('play');
const races = ref<Race[]>([]);
const hippodromeId = ref<string>('');

watch(() => pollaStore.SelectedHippodrome, async(newValue) =>
{
  tapOptionSelected.value = pollaStore.OptionSelected;

  hippodromeId.value = newValue.id;

  if (newValue?.allowsPlay)
  {
    races.value = await GetRacesUseCase.handle(newValue);
  }

  if (!newValue?.allowsPlay)
  {
    // TODO: obtener el historial de apuestas
  }

  loading.value = false;

}, { immediate: true, deep: true });

watch(() => pollaStore.OptionSelected, (newValue) =>
{
  tapOptionSelected.value = newValue;
}, { immediate: true, deep: true });
</script>


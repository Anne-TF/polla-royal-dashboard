<template>
    <div v-show="tapOptionSelected === 'play'" :key="`play-${hippodromeId}`" class="cards">
      <q-skeleton v-if="loading" b class="mb-10" :count="3" height="100" />
      <RaceCardComponent v-show="!loading" v-for="(race, index) in races" :key="`${index}-${race.id}`" :race/>
    </div>

    <div v-show="tapOptionSelected === 'history'" :key="`history-${hippodromeId}`" class="cards">
      <q-skeleton v-if="loading" b class="mb-10" :count="3" height="100" />
      <TicketCardComponent v-show="!loading" v-for="ticket in ticketHistory" :key="ticket.ticket" :ticket />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Race } from '@modules/polla/domain/models';
import { usePollaStore } from '@modules/polla/domain/store';
import { GetRacesUseCase, GetTicketHistoryUseCase } from '@modules/polla/domain/useCases';
import { RaceCardComponent, TicketCardComponent } from '@modules/polla/presentation/components';
import { OptionsTap } from '@modules/polla/domain/store/types';
import { ITicket } from '@modules/polla/infrastructure/interfaces';

const pollaStore = usePollaStore();
const loading = ref<boolean>(true);
const tapOptionSelected = ref<OptionsTap>('play');
const races = ref<Race[]>([]);
const hippodromeId = ref<string>('');
const ticketHistory = ref<ITicket[]>([]);

watch(() => pollaStore.SelectedHippodrome, async(newValue) =>
{
  tapOptionSelected.value = pollaStore.OptionSelected;

  hippodromeId.value = newValue?.id;

  if (newValue?.allowsPlay)
  {
    const [_races, _ticketHistory] = await Promise.all([
      GetRacesUseCase.handle(newValue),
      GetTicketHistoryUseCase.handle(newValue.id)
    ]);

    races.value = _races;
    ticketHistory.value = _ticketHistory;
  }

  if (!newValue?.allowsPlay && newValue?.id)
  {
    ticketHistory.value = await GetTicketHistoryUseCase.handle(newValue.id);
  }

  loading.value = false;

}, { immediate: true, deep: true });

watch(() => pollaStore.OptionSelected, async(newValue) =>
{
  tapOptionSelected.value = newValue;
}, { immediate: true, deep: true });
</script>

<style scoped lang="scss">

.cards {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
}
</style>


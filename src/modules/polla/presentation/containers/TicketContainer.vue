<template>
  <div>
    <q-footer elevated
              :class="{
      'wp-50 q-mx-auto' : $q.screen.gt.md
    }"
              class="bg-app-secondary-500" style="border-radius: 20px 20px 0 0"
    >
      <q-toolbar >
        <q-toolbar-title class="text-app-primary text-semi-bold px-8 flex items-center"
                         :class="{'disabled': !pollaStore.Betting}">
          <span :class="{'text-strike': !pollaStore.Betting}">Ticket</span>
          <q-space />
          {{ aproximateAmountBet }} {{pollaStore.Ticket?.currency}}
          <q-icon size="1.5em" name="expand_less" @click="toggleShowing" />
        </q-toolbar-title>
      </q-toolbar>

      <q-menu no-parent-event v-model="showing"
              cover anchor="top middle"
              :offset="[0, -15]"
              class="bg-app-primary-100"
              :style="`${showing ? 'z-index: 9999;' : ''}`"
              style="border-radius: 20px 20px 0 0"
      >
        <q-card class="bg-app-primary-100">
          <q-toolbar class="bg-app-secondary-500" style="border-bottom: #7e3ac7 dashed 1.5px">
            <q-toolbar-title class="text-app-primary text-semi-bold px-8 flex items-center"
                             :class="{'disabled': !pollaStore.Betting}">
              <span :class="{'text-strike': !pollaStore.Betting}">Ticket</span>
              <q-space />
              <q-icon size="1.5em" name="expand_more" @click="toggleShowing" />
            </q-toolbar-title>
          </q-toolbar>

          <q-card-section class="fs-16">
            <div class="flex row">
              <span class="text-semi-bold text-grey-14 fs-16">Hipodromo: </span>
              <q-space />
              <span class="text-semi-bold text-app-primary">{{ pollaStore.SelectedHippodrome.name }}</span>
            </div>
            <div class="flex row">
              <span class="text-semi-bold text-grey-14 fs-16">Combinaciones: </span>
              <q-space />
              <span class="text-semi-bold text-app-primary">{{ combinations }}</span>
            </div>
            <div class="flex row pb-10" style="border-bottom: #7e3ac7 dashed 1.5px">
              <span class="text-semi-bold text-grey-14 fs-16">Precio por combinacion: </span>
              <q-space />
              <span class="text-semi-bold text-app-primary">{{ pollaStore.Ticket.amount }} {{ pollaStore.Ticket.currency }}</span>
            </div>
            <div class="flex row mt-10" >
              <span class="text-semi-bold text-grey-14 fs-16">Total: </span>
              <q-space />
              <span class="text-semi-bold text-app-primary">{{ aproximateAmountBet }} {{ pollaStore.Ticket.currency }}</span>
            </div>
          </q-card-section>

          <q-card-section>
            <div v-for="(id, key) in Object.keys(pollaStore.Bet.races)" :key class="">
              <div v-if="pollaStore.Bet.races[id].length" class="flex column mb-20">
                <div>
                  <span class="text-semi-bold text-app-primary">Carrera</span>
                  <span class="text-app-secondary-700 q-mx-sm text-bold text-italic">
                <span class="fs-12">#</span>{{parse(removeNonNumericCharacters(id.slice(-2)))}}</span>
                  <q-separator class="separator-app-primary-800" size="2px" style="width: 5.5em"/>
                </div>
                <div class="flex row q-mt-sm q-gutter-sm">
                  <RunnerBoxComponent  v-for="(runnerId, _key)  in pollaStore.Bet.races[id]" :key="_key" :runner="getRunner(runnerId)" :modelValue="[runnerId]" :size="40" />
                </div>
              </div>
            </div>
          </q-card-section>

          <q-btn :disable="disabledBet" color="app-primary" align="center" class="full-width no-border-radius" style="height: 5vh; ">
            APOSTAR
          </q-btn>

        </q-card>
      </q-menu>

    </q-footer>

    <div v-show="showing" class="backdrop no-scroll"></div>
  </div>
</template>

<script setup lang="ts">
import { usePollaStore } from '@modules/polla/domain/store';
import { RunnerBoxComponent } from '@modules/polla/presentation/components';
import { ref, watch } from 'vue';
import { parse, removeNonNumericCharacters } from '@common/utils';
import { IRunner } from '@modules/polla/domain/models';

const pollaStore = usePollaStore();

const showing = ref<boolean>(false);
const aproximateAmountBet = ref<number>(0);
const disabledBet = ref<boolean>(true);
const combinations = ref<number>(0);

const toggleShowing = () =>
{
  showing.value = !showing.value;
};

const getRunner = (id: string) =>
{
  const programNumber = id.slice(-2);

  return {
    id,
    programNumber,
    number: parse(removeNonNumericCharacters(programNumber)),
    allow: true
  } as IRunner;
};


watch(() => pollaStore.Bet, async(newValue) =>
{

  const racesKey = Object.keys(newValue.races);

  combinations.value =  racesKey.reduce((acc, key) =>
  {
    const lengthRunners = newValue.races[key].length;

    if (lengthRunners)
    {
      return acc * lengthRunners;
    }

    return acc;
  }, 1);

  aproximateAmountBet.value = combinations.value * pollaStore.Ticket.amount;

  disabledBet.value = !racesKey.every(key => newValue.races[key].length);

}, { deep: true });

watch(showing, (newValue) =>
{
  document.body.style.overflow = newValue ? 'hidden' : '';
});

</script>

<style scoped>

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 45%);
  overflow: hidden !important;
  z-index: 9998;
}

</style>

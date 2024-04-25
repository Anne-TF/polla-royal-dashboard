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
              <span class="text-semi-bold" :class="{
                'text-red': insufficientBalance,
                'text-app-primary': !insufficientBalance
              }" >{{ aproximateAmountBet }} {{ pollaStore.Ticket.currency }}</span>
            </div>
            <div v-if="insufficientBalance" class="flex row mt-5 fs-12 text-italic" >
              <span class="text-semi-bold text-red">Su saldo es insuficiente para realizar esta apuesta </span>
            </div>
          </q-card-section>

          <q-card-section class="overflow-auto" style="height: 60vh;">
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

          <q-card-section class="q-py-sm q-px-xs text-grey-14">
            <q-checkbox v-model="termsAccepted" color="app-secondary">
              <template #default>
                Acepto los <a link="/" class="text-app-primary text-semi-bold">términos y condiciones</a>
              </template>
            </q-checkbox>
          </q-card-section>

<!--          <q-btn :disable="disabledBet || !termsAccepted || insufficientBalance" color="app-primary" align="center"-->
          <q-btn :disable="disabledBet || !termsAccepted" color="app-primary" align="center"
                 @click="() => {
                   showing = false;
                   confirm = true;
                 }"
                 class="full-width no-border-radius" style="height: 5vh; ">
            APOSTAR
          </q-btn>

        </q-card>
      </q-menu>

    </q-footer>

    <div v-show="showing" class="backdrop no-scroll"></div>

    <q-dialog
      :transition-hide="$q.screen.lt.md ? 'slide-down' : 'fade'"
      :transition-show="$q.screen.lt.md ? 'slide-up' : 'fade'" :maximized="$q.screen.lt.md" v-model="confirm">
      <q-card class="flex flex-center bg-app-primary-100" :class="{
        'q-pa-xl br-10' : $q.screen.gt.md,
      }">
        <q-card-section class="text-center">
          <h3 class="lh-40 text-app-primary q-mb-md">¿Desea registrar <br /> su apuesta?</h3>
          <section class="text-grey-14 text-medium" style="font-size: clamp(1em, 1.5em, 2em)">
            Su apuesta no podrá ser anulada ni modificada después de registrarse.

            <div class="flex q-mt-xl" style="gap: 10px;">
              <q-btn color="app-primary"
                     @click="confirmBet"
                     :loading="loading"
                     class="br-6 q-py-sm text-semi-bold col" no-caps unelevated>
                Aceptar
              </q-btn>

              <q-btn color="app-secondary"
                     @click="confirm = false"
                     class="br-6 q-py-sm text-app-primary text-semi-bold col" no-caps unelevated>
                Cancelar
              </q-btn>
            </div>
          </section>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { usePollaStore } from '@modules/polla/domain/store';
import { RunnerBoxComponent } from '@modules/polla/presentation/components';
import { ref, watch } from 'vue';
import { parse, removeNonNumericCharacters } from '@common/utils';
import { IRunner } from '@modules/polla/domain/models';
import { useAuthStore } from '@modules/auth/domain/store';
import { PollaUseCase } from '@modules/polla/domain/useCases';

const pollaStore = usePollaStore();
const authStore = useAuthStore();

const showing = ref<boolean>(false);
const aproximateAmountBet = ref<number>(0);
const disabledBet = ref<boolean>(true);
const combinations = ref<number>(0);
const termsAccepted = ref<boolean>(false);
const confirm = ref<boolean>(false);
const insufficientBalance = ref<boolean>(false);
const loading = ref<boolean>(false);

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

const confirmBet = async() =>
{
  loading.value = true;
  try
  {
    await PollaUseCase.handle();
  }
  catch (e)
  {
    console.log(e);
  }
  loading.value = false;
  confirm.value = false;
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

  insufficientBalance.value = aproximateAmountBet.value > authStore.GetBalance(authStore.GetDefaultCurrency);

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

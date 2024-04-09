<template>
  <div>
    <q-card class="bg-app-primary-100 br-16">

      <q-card-section class="fs-16 history">
        <div class="flex column items-start ">
          <span class="text-semi-bold text-grey-14 fs-16">Ticket: <span class="text-semi-bold text-app-primary"> {{ticket.ticket}}</span> </span>
          <span class="text-semi-bold text-grey-14 fs-14">Fecha: <span class="text-semi-bold text-app-primary">{{ticket.date}}</span></span>
        </div>
        <div class="flex column items-end">
          <span class="text-semi-bold text-app-primary fs-16">
            {{ticket.amount}}
            <span class="text-medium fs-10">USD</span>
          </span>
          <span class="text-semi-bold text-app-primary fs-14">
            {{ticket.pointsTicket}}
            <span class="text-medium fs-10">Pts</span>
          </span>
          <q-icon name="info_outline" size="1.2rem" class="text-grey cursor-pointer" @click="toggleShowing"  />
        </div>
      </q-card-section>

      <q-menu no-parent-event v-model="showing"
              cover anchor="top middle"
              :offset="[0, -15]"
              class="br-16 bg-app-primary-100"
              :style="`${showing ? 'z-index: 9999;' : ''}`"
      >
        <q-card class="bg-app-primary-100">
          <q-card-section class="fs-16 history">
            <div class="flex column items-start ">
              <span class="text-semi-bold text-grey-14 fs-16">Tiket: <span class="text-semi-bold text-app-primary"> {{ticket.ticket}}</span> </span>
              <span class="text-semi-bold text-grey-14 fs-14">Fecha: <span class="text-semi-bold text-app-primary">{{ticket.date}}</span></span>
            </div>
            <div class="flex column items-end">
            <span class="text-semi-bold text-app-primary fs-16">
              {{ticket.amount}}
              <span class="text-medium fs-10">USD</span>
            </span>
              <span class="text-semi-bold text-app-primary fs-14">
              {{ticket.pointsTicket}}
              <span class="text-medium fs-10">Pts</span>
            </span>
              <q-icon v-if="!showing" name="info_outline" size="1.2rem" class="text-grey" @click="toggleShowing"  />
            </div>
          </q-card-section>

          <q-card-section>
            <div v-for="(id, key) in cardsId" :key class="">
              <div class="flex justify-between items-center mb-6">
                <div>
                  <span class="text-semi-bold text-app-primary">Carrera</span>
                  <span class="text-app-secondary-700 q-mx-sm text-bold text-italic">
                <span class="fs-12">#</span>{{key+1}}</span>
                  <q-separator class="separator-app-primary-800" size="2px" style="width: 5.5em"/>
                </div>
                <RunnerBoxComponent :runner="getRunner(id)" :modelValue="[id]" size="40" />
              </div>
            </div>
          </q-card-section>

        </q-card>
      </q-menu>
    </q-card>

    <div v-show="showing" class="backdrop no-scroll"></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, toRefs, watch } from 'vue';
import { ITicket } from '@modules/polla/infrastructure/interfaces';
import { RunnerBoxComponent } from '@modules/polla/presentation/components';
import { IRunner } from '@modules/polla/domain/models';
import { parse, removeNonNumericCharacters } from '@common/utils';

const selectedRunners = ref<string[]>([]);

const props = defineProps({
  ticket: {
    type: Object as () => ITicket,
    required: true
  }
});

const { ticket } = toRefs(props);

const showing =  ref(false);

const cardsId = Object.keys(ticket.value.selections);
const toggleShowing = () =>
{
  showing.value = !showing.value;
};

const getRunner = (runnerId: string) =>
{
  const programNumber = ticket.value.selections[runnerId].programNumber;

  return {
    id: runnerId,
    programNumber: ticket.value.selections[runnerId].programNumber,
    number: parse(removeNonNumericCharacters(programNumber)),
    allow: true
  } as IRunner;
};

watch(showing, (newValue) =>
{
  document.body.style.overflow = newValue ? 'hidden' : '';
});

</script>

<style scoped>

.history {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr .4fr;
}

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

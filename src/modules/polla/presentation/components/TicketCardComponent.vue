<template>
  <q-card class="bg-app-primary-100 br-16">
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
        <q-icon name="info_outline" size="1.2rem" class="text-grey" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { defineProps, reactive, ref, toRefs, watch } from 'vue';
import RunnerBoxComponent from './RunnerBoxComponent.vue';
import CoinIcon from '@common/icons/CoinIcon.vue';
import { Race } from '@modules/polla/domain/models';
import { usePollaStore } from '@modules/polla/domain/store';
import { ITicket } from '@modules/polla/infrastructure/interfaces';

const props = defineProps({
  ticket: {
    type: Object as () => ITicket,
    required: true
  }
});

const { ticket } = toRefs(props);

</script>

<style scoped>

.history {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr .4fr;
}

</style>

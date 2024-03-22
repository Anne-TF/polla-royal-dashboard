<template>
  <div >
    <q-btn @click="parxRacingDialog = true" :ripple="false" class="fs-15" dense flat no-caps>
      <span class="text-semi-bold text-app-secondary-400">Parx racing</span>
      <span class="text-app-primary-50 fs-12 q-mx-sm text-medium">19/03</span>
      <q-icon size="1.2em" style="margin-top: -5px;" name="arrow_drop_down" class="text-app-primary-200"/>
      <q-separator class="wp-100 separator-app-primary-800 q-mt-xs" size="2px"/>
    </q-btn>

    <q-dialog :maximized="$q.screen.lt.md" :position="$q.screen.lt.md ? 'bottom' : 'default'" v-model="parxRacingDialog">
      <q-card flat class="bg-app-primary"
              :class="{ 'hv-90' : $q.screen.height <= 800, 'hv-45' : $q.screen.height > 800 }"
              :style="`border-radius: ${$q.screen.lt.md ? '16px 16px 0 0' : '32px'} !important;`">
        <q-card-section class="flex items-center justify-between">
          <p class="no-margin fs-18">
            <span class="text-semi-bold text-app-secondary-400">Parx racing</span>
            <span class="text-app-primary-50 fs-14 q-mx-sm text-medium">19/03</span>
          </p>
          <q-btn dense flat size="md" icon="close" v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input standout dark rounded v-model="search" dense placeholder="Buscar" style="width: auto"/>

        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';

const parxRacingDialog = ref<boolean>(false);
const search = ref<string>('');
</script>

<template>
  <q-layout view="lHh lpR lFf">
    <q-header reveal class="flex justify-between wp-100 q-pt-xl q-pb-none q-px-md bg-app-primary">
      <h1 class="no-margin text-uppercase text-regular ls-1" style="font-size: clamp(4vw, 5vw, 8vw)">Polla royal</h1>
      <BalanceVisualizer />
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { BalanceVisualizer } from '@common/components';

</script>

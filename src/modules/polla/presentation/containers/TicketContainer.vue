<template>
  <q-footer elevated
    :class="{
      'wp-50 q-mx-auto' : $q.screen.gt.md
    }"
    class="bg-app-secondary-500" style="border-radius: 20px 20px 0 0" >
    <q-toolbar >
      <q-toolbar-title class="text-app-primary text-semi-bold px-8 flex items-center"
                       :class="{'disabled': !pollaStore.Betting}">
        <span :class="{'text-strike': !pollaStore.Betting}">Ticket</span>
        <q-space />
        <q-icon size="1.5em" name="expand_less" />
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>

<script setup lang="ts">
import { usePollaStore } from '@modules/polla/domain/store';

const pollaStore = usePollaStore();
</script>

<template>
  <q-layout view="lHh lpR lFf"
   :class="{
      'wp-50 q-mx-auto' : $q.screen.gt.md
    }"
   >
    <HeadContainer />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { HeadContainer } from '@common/containers';
</script>

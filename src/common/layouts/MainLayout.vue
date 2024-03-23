<template>
  <q-layout view="lHh lpR lFf">
    <HeadContainer />
    <q-page-container >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { HeadContainer } from '@common/containers';
</script>

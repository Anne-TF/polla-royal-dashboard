<template>
  <q-layout view="lHh lpR lFf">

    <q-header reveal>
      <q-toolbar class="flex justify-between wp-100 q-pt-md q-pb-none q-px-md bg-app-primary">
        <q-toolbar-title>
          <q-img
            :src="'/images/horse.svg'"
            fit="contain"
            class="login_form-img hp-36"
            width="80px"
          />
        </q-toolbar-title>
        <BalanceVisualizer />
      </q-toolbar>
    </q-header>

    <q-page-container >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { BalanceVisualizer } from '@common/components';

</script>

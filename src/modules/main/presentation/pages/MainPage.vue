<template>
  <q-page class="q-px-md q-pb-md" style="padding-top: 10em;">

    <RaceCard v-for="race in races" :key="race.number" class="mb-10" :race/>

    <NavSticky/>

    <q-footer elevated class="bg-app-secondary-500" style="border-radius: 20px 20px 0 0" >
      <q-toolbar >
        <q-toolbar-title class="text-app-primary text-semi-bold px-8 flex items-center">Ticket
          <q-space />
        <q-icon size="1.5em" name="expand_less" />
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-page>
</template>

<script setup lang="ts">
import { NavSticky, RaceCard } from '../components';

const races = [
  ...Array.from({ length: 6 }, (_, i) => ({
    number: i + 1,
    horses: [
      ...Array.from({ length: Math.floor(Math.random() * (15 - 2 + 1)) + 2 }, (__, ii) => (ii + 1))
    ]
  }))
];
</script>
```

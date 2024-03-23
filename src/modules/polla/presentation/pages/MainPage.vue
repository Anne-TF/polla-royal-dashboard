<template>
  <q-page class="q-px-md q-pb-md" style="padding-top: 10em;">
    <RaceCard v-show="!loading" v-for="race in races" :key="race.number" class="mb-10" :race/>

    <div v-if="loading">
       laodng
    </div>
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
import { GetRacesUseCase } from '@modules/polla/domain/useCases';
import { usePollaStore } from '@modules/polla/domain/store';
import { ref, watch } from 'vue';
import { Race } from '@modules/polla/domain/models';
const pollaStore = usePollaStore();
const loading = ref<boolean>(true);
const races = ref<Race[]>([]);


watch(() => pollaStore.GetSelectedHippodrome, async(newValue) =>
{
  if (newValue)
  {
    races.value = await GetRacesUseCase.handle(pollaStore.GetSelectedHippodrome);

    loading.value = false;
  }
}, { immediate: true, deep: true });
</script>
```

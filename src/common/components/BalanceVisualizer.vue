<template>
  <div class="flex column items-end">
    <span class="text-app-primary-300">Saldo <q-icon size="1.3em" class="q-ml-sm" @click="hidden = !hidden" :name="hidden ? 'visibility' : 'visibility_off'" /> </span>
    <p style="font-size: clamp(3vw, 5vw, 8vw);" class="text-app-primary-100">
      {{hidden ? '*******' :  '100,35' }}
      <span class="fs-13">USD
        <q-icon size="1.2em" style="margin-top: -5px;" color="text-app-primary-100" name="arrow_drop_down" />
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const hidden = ref<boolean>(false);
</script>

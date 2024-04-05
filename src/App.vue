<template>
  <div
    :style="`background-image: url('/images/bgImg.svg')`"
    style="background-position: center; background-repeat: no-repeat; background-size: cover; background-attachment: fixed; "
  >
    <router-view  />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
// VARIABLES AND CONSTANTS
const { locale } = useI18n({ useScope: 'global' });
locale.value = 'es-ES';
</script>


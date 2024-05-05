<template>
  <div>
    <router-view  />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
// VARIABLES AND CONSTANTS
const { locale } = useI18n({ useScope: 'global' });
locale.value = 'es-ES';
</script>


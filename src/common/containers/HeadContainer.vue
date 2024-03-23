<template>
  <NavComponent>
    <template #right>
      <BalanceComponent />
    </template>
  </NavComponent>
</template>

<script setup lang="ts">
import { NavComponent, BalanceComponent  } from '@common/components';
</script>

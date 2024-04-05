<template>
  <q-header reveal class="bg-app-tertiary" >
    <q-toolbar class="flex justify-between q-pt-md q-pb-none q-px-md"
               :class="{
      'wp-50 q-mx-auto' : $q.screen.gt.md
    }"
    >
      <q-toolbar-title>
        <q-img
          :src="'/images/horse.svg'"
          fit="contain"
          class="login_form-img hp-36"
          width="80px"
        />
      </q-toolbar-title>
      <slot name="right"></slot>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
</script>

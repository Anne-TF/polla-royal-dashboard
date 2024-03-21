<template>
  <q-layout view="hHr lpr ffr">
    <div class="row">
      <div class="col-md-7 col-lg-8 col-xl-9" >
        <q-img
          src="/images/background-login.svg"
          fit="cover"
          :ratio="1"
          position="top center"
          class="overflow-hidden wp-100 hp-100-vh"
        />
      </div>
      <div class="col-xs-12 col-md col-lg col-xl">
        <q-page-container >
          <RouterView v-slot="{ Component }">
            <template v-if="Component">
              <component :is="Component"></component>
            </template>
          </RouterView>
        </q-page-container>
      </div>
    </div>
  </q-layout>
</template>
<script setup lang="ts">
</script>

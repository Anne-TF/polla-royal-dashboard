<template>
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
      <slot name="right"></slot>
    </q-toolbar>
  </q-header>
</template>

<template>
  <q-item
    clickable
    @click="$router.push(link)"
    v-ripple
  >
    <q-item-section v-if="icon" avatar >
      <q-icon :name="icon"  class="mini-i"/>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}

withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: ''
});

</script>

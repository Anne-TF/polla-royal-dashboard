<template>
    <q-checkbox size="40px" v-model="shape" :val="number" class="br-8" :style="`background-color:${color}; `"/>
</template>

<script setup lang="ts">
import { ref, defineProps, toRefs } from 'vue';

const  shape = ref(false);

const props = defineProps({
  size: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  }
});

const isActive = ref(false);

const { size, number, color } = toRefs(props);
</script>

<style scoped>
.horse-box .q-checkbox__inner {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: none;
}

.horse-number {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>

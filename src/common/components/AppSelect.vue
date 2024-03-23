<template>
  <div class="wp-40">
    <q-btn @click="parxRacingDialog = true" :ripple="false" class="fs-15 wp-100" dense flat no-caps>
      <span class="text-semi-bold text-app-secondary-400 wp-60 ellipsis">{{ selectedOption.name }}</span>
      <span v-if="selectedOption?.suffix" class="text-app-primary-50 fs-12 q-mx-xs text-medium">{{selectedOption.suffix}}</span>
      <q-icon size="1.2em" style="margin-top: -5px;" name="arrow_drop_down" class="text-app-primary-200"/>
      <q-separator class="wp-100 separator-app-primary-800 q-mt-xs" size="2px"/>
    </q-btn>

    <q-dialog :maximized="$q.screen.lt.md" :position="$q.screen.lt.md ? 'bottom' : 'default'" v-model="parxRacingDialog">
      <q-card flat class="bg-app-primary"
              :class="{ 'hv-90' : $q.screen.height <= 800, 'hv-45' : $q.screen.height > 800 }"
              :style="`border-radius: ${$q.screen.lt.md ? '16px 16px 0 0' : '32px'} !important;`">

        <q-card-section class="flex items-center justify-between">
          <p class="no-margin fs-18">
            <span class="text-semi-bold text-app-secondary-400">{{ selectedOption.name }}</span>
            <span v-if="selectedOption?.suffix" class="text-app-primary-50 fs-14 q-mx-sm text-medium">{{selectedOption.suffix}}</span>
          </p>
          <q-btn dense flat size="md" icon="close" v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input standout dark rounded v-model="search" dense placeholder="Buscar" style="width: auto"/>
        </q-card-section>

        <q-card-section class="q-pt-none overflow-auto hp-70">
          <q-item v-for="option of data" :key="option.value" clickable v-ripple class="br-50 text-medium fs-14"
                  @click="onClick(option)" :active="selectedOption.value === option.value" active-class="bg-app-primary-900 text-app-secondary fs-14 text-semi-bold" >
            <q-item-section>{{ option.name }}</q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">

import { ref, toRefs } from 'vue';

interface IOption {
  name: string;
  suffix?: string;
  value: string;
}

const emit = defineEmits<{
  (event: 'onSelect', value: string): void;
}>();

const parxRacingDialog = ref<boolean>(false);
const search = ref<string>('');


const props = defineProps({
  defaultSelect: {
    type: Object as () => IOption,
    required: true,
    default: () => ({ name: '', value: '' })
  },
  data: {
    type: Array as () => IOption[],
    required: true,
    default: () => []
  }
});

const { data, defaultSelect } = toRefs(props);

const selectedOption = ref<IOption>(defaultSelect.value);

const onClick = (option: IOption) =>
{
  selectedOption.value = option;
  parxRacingDialog.value = false;
  emit('onSelect', option.value);
};

</script>

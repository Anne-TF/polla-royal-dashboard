<template>
  <q-btn @click="parxRacingDialog = true" align="between" :ripple="false" dense flat no-caps>
      <div class="ellipsis w-90">
        <span v-if="selectedOption.name" class="text-semi-bold text-app-secondary-400 ">{{ selectedOption.name }}</span>
        <q-skeleton v-else type="text" class="wp-60" style="height: 20px"/>
      </div>

      <div>
       <span v-if="selectedOption?.suffix" class="text-app-primary-50 fs-12 q-mx-xs text-medium">{{selectedOption.suffix}}</span>
        <q-icon size="1.2em" style="margin-top: -5px;" name="arrow_drop_down" class="text-app-primary-200"/>
      </div>

      <q-separator class="wp-100 separator-app-primary-800 q-mt-xs" size="2px"/>

      <q-menu v-if="$q.screen.gt.md || $q.screen.name === 'md'"
              fit anchor="bottom left"
              self="top start"
              class="bg-app-primary fs-16 text-medium shadow-13 br-8 no-scroll"
              max-height="40vh"
              min-width="30vh"
      >
        <q-input class="my-10 mx-5" standout dark rounded v-model="search" @update:model-value="onSearch($event as string)" dense placeholder="Buscar" style="width: auto"/>
        <q-scroll-area style="height: 30vh; max-height: 40vh" >
          <q-list class="q-pr-sm">
            <q-item v-for="option of _data" :key="option.value" clickable v-ripple class="br-50 text-medium fs-14 my-10 mx-5"
                    @click="onSelect(option)" :active="selectedOption.value === option.value" active-class="bg-app-primary-900 text-app-secondary fs-14 text-semi-bold" >
              <q-item-section>
                  <span v-html="option.name.toLowerCase().includes(search.toLowerCase()) && search ?
                      applyHighlight(option.name, search, 'text-semi-bold text-yellow') :
                  option.name" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-menu>
    </q-btn>

    <q-dialog v-if="$q.screen.lt.md" :maximized="$q.screen.lt.md" :position="'bottom'" v-model="parxRacingDialog">
      <q-card flat class="bg-app-primary"
              :class="{ 'hv-90' : $q.screen.height <= 800, 'hv-45' : $q.screen.height > 800, 'wp-40' : $q.screen.gt.sm }"
              :style="`border-radius: ${$q.screen.lt.md ? '16px 16px 0 0' : '32px'} !important;`">

        <q-card-section class="flex items-center justify-between">
          <p class="no-margin fs-18">
            <span class="text-semi-bold text-app-secondary-400">{{ selectedOption.name }}</span>
            <span v-if="selectedOption?.suffix" class="text-app-primary-50 fs-14 q-mx-sm text-medium">{{selectedOption.suffix}}</span>
          </p>
          <q-btn dense flat size="md" icon="close" v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input standout dark rounded v-model="search" @update:model-value="onSearch($event as string)" dense placeholder="Buscar" style="width: auto"/>
        </q-card-section>

        <q-card-section class="q-pt-none overflow-auto hp-70">
          <q-scroll-area style="height: 100%; max-height: 100%" >
            <q-list class="q-pr-sm">
              <q-item v-for="option of _data" :key="option.value" clickable v-ripple class="br-50 text-medium fs-14 my-10 mx-5"
                      @click="onSelect(option)" :active="selectedOption.value === option.value" active-class="bg-app-primary-900 text-app-secondary fs-14 text-semi-bold" >
                <q-item-section>
                  <span v-html="option.name.toLowerCase().includes(search.toLowerCase()) && search ?
                      applyHighlight(option.name, search, 'text-semi-bold text-yellow') :
                  option.name" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog :maximized="$q.screen.lt.md" :position="$q.screen.lt.md ? 'bottom' : 'standard'" v-model="confirmDialog">
      <q-card flat class="bg-app-primary-100 text-app-primary flex column flex-center"
              :class="{ 'hv-50' : $q.screen.height <= 800, 'hv-30' : $q.screen.height > 800 }"
              :style="`border-radius: ${$q.screen.lt.md ? '16px 16px 0 0' : '32px'} !important;`">

        <q-card-section class="flex column flex-center q-pb-sm">
          <q-icon name="warning" color="app-warning" class="q-mb-sm" size="3em" />
          <p class="no-margin fs-18">
            <span class="text-semi-bold">Confirmacion</span>
          </p>
        </q-card-section>

        <q-card-section class="q-pt-none q-mb-xl">
          <p class="fs-14 text-medium text-center">{{confirmationMessage}}</p>
        </q-card-section>

        <q-card-section class="q-pt-none wp-100 flex absolute-bottom flex-center q-gutter-x-md q-mb-lg">
          <q-btn dense flat rounded class="q-px-md text-semi-bold" style="opacity: .7;" color="app-primary" label="Cambiar" @click="onConfirm" />
          <q-btn dense unelevated rounded class="q-px-md bg-app-secondary text-app-primary text-semi-bold" label="Cancelar" @click="confirmDialog = false" />
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script setup lang="ts">

import { ref, toRefs, watch } from 'vue';
import { applyHighlight } from '@common/utils';

interface IOption {
  name: string;
  suffix?: string;
  value: string;
}

const emit = defineEmits<{
  (event: 'onSelect', value: string): void;
}>();

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
  },
  allowChange: {
    type: Boolean,
    default: true
  },
  confirmationMessage: {
    type: String,
    default: '¿Desea cambiar la opción seleccionada?'
  }
});

const { data, defaultSelect, allowChange, confirmationMessage } = toRefs(props);

const parxRacingDialog = ref<boolean>(false);
const confirmDialog = ref<boolean>(false);
const search = ref<string>('');
const selectedOption = ref<IOption>(defaultSelect.value);
const auxSelectedOption = ref<IOption>(defaultSelect.value);

const _data = ref<IOption[]>(data.value);

const changeSelection = (option: IOption) =>
{
  selectedOption.value = option;
  parxRacingDialog.value = false;
  confirmDialog.value = false;
  emit('onSelect', option.value);
};

const onSearch = (needle: string) =>
{
  if (needle)
  {
    _data.value = data.value.filter((option) => option.name.toLowerCase().includes(needle.toLowerCase()));
    return;
  }
  _data.value = data.value;
};

const onSelect = (option: IOption) =>
{
  if (allowChange.value)
  {
    changeSelection(option);
  }
  else
  {
    parxRacingDialog.value = false;
    confirmDialog.value = true;
    auxSelectedOption.value = option;
  }
};

const onConfirm = () =>
{
  changeSelection(auxSelectedOption.value);
};


watch(defaultSelect, (value) =>
{
  selectedOption.value = value;
}, { immediate: true, deep: true });


watch(data, (value) =>
{
  if (value.length)
  {
    _data.value = value;
  }
}, { immediate: true, deep: true });

</script>

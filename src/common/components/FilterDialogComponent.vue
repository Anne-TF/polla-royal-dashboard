<template>
  <q-card class="hp-100 bg-app-primary" style="width: 350px">
    <q-card-section class="row items-center no-wrap q-py-sm">
      <div class="fs-18 text-semi-bold">
        {{ titleFilter }}
      </div>

      <q-space />

      <q-btn
        @click="emitCloseFilter"
        flat
        round
        color="bl-danger"
        icon="close"
      />
    </q-card-section>

    <q-separator dark class="q-mb-sm" />

    <q-card-section class="row items-center no-wrap q-py-none text-white">
      <div class="text-light-black fs-12 text-semi-bold">Filtros</div>
      <q-space />

      <q-btn
        @click="emitClearFilters"
        flat
        no-caps
        class="fs-12 text-semi-bold text-app-secondary"
        label="Reestablecer filtros"
        color="bl-danger"
      />
    </q-card-section>

    <q-card-section class="q-mt-md q-py-none text-white">
      <div class="text-light-black fs-14 text-semi-bold">
        {{ statusProperty }}
      </div>

      <q-option-group
        :options="optionsFilter"
        type="checkbox"
        dark
        @update:model-value="emitCheckFilter($event)"
        class="fs-13"
        color="app-secondary"
        v-model="filtersToApply"
      />
    </q-card-section>

    <q-separator dark class="mb-70 absolute-bottom" />
    <q-card-section class="absolute-bottom">
      <q-btn
        no-caps
        unelevated
        @click="emitApplyFilters"
        color="app-secondary"
        class="full-width text-semi-bold  text-app-primary fs-14 q-px-md"
      >
        Aplicar filtros
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  titleFilter: string;
  statusProperty: string;
  optionsFilter: any[];
  filtersToApply: string[];
}>();

const emit = defineEmits<{
  (e: 'closeFilter');
  (e: 'clearFilters');
  (e: 'checkFilter', value: string[]);
  (e: 'applyFilters', value: string[]);
}>();

const filtersToApply = ref<any>(props.filtersToApply);
const emitCloseFilter = () =>
{
  emit('closeFilter');
};
const emitClearFilters = () =>
{
  emit('clearFilters');
};
const emitCheckFilter = (valueFilter: string[]) =>
{
  emit('checkFilter', valueFilter);
};

const emitApplyFilters = () =>
{
  emit('applyFilters', filtersToApply.value);
};
</script>

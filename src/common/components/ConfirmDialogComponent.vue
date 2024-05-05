<template>
  <q-card :style="$q.screen.lt.md ? 'border-radius: 16px 16px 0 0 !important;' : ''"
    :class="{
      'wp-100 hp-100 q-py-lg': $q.screen.lt.md,
      'hp-30 br-32': !$q.screen.lt.md,
      'wp-30' : $q.screen.gt.md,
      'wp-50' : $q.screen.md,
    }"
    class="flex column items-center justify-center relative text-aut-grayscale-body"
  >
    <q-card-section class="text-center px-lg py-xs my-2xl wp-80 text-app-primary">
      <q-icon class="mb-30" :name="icon" color="app-primary" size="4em" />
      <h5 v-text="title" class="q-mt-none q-mx-none q-mb-md" :class="{ 'text-title-50' : $q.screen.lt.md }" />
      <p v-html="caption" :class="{ 'text-body-40' : $q.screen.gt.sm, 'text-body-20' : $q.screen.lt.md }" />
    </q-card-section>

    <q-card-actions align="between" class="flex row-gutter-lg mt-xl wp-80">
      <q-btn
        color="app-secondary"
        unelevated
        class="ls-1 fs-15 br-10 py-10 px-30 text-app-primary"
        v-close-popup
        no-caps
        @click="emitFnNo"
      >
        Cancelar
      </q-btn>
      <q-btn
        color="app-primary"
        unelevated
        :loading="loadingDialog"
        v-close-popup
        @click="emitFnYes"
        class="ls-1 fs-15 br-10 py-10 px-30"
        no-caps
      >
        {{ yesBtnText ?? 'Si, confirmar' }}
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'onYes'): void;
  (e: 'onNo'): void;
}>();

const props = defineProps<{
  title: string;
  caption?: string | null;
  loadingDialog?: boolean;
  yesBtnText?: string;
  icon?: string;
}>();

const emitFnYes = () =>
{
  emit('onYes');
};
const emitFnNo = () =>
{
  emit('onNo');
};
</script>

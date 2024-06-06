<template>
  <q-form
    class="w-full br-10 q-py-xl q-px-md flex column custom-size-input"
    style="gap: 20px; background-color: #272630;" ref="formRef" greedy @submit.prevent="onSubmit">
    <p v-text="'Ingresa los datos del operador para continuar'" class="text-semi-bold text-grey-5" />
    <div class="row items-center justify-between"
         :class="{ 'wp-100' : $q.screen.lt.md, '' : $q.screen.gt.sm }" style="gap: 15px;">
      <q-input
        class="col-12 col-md"
        :rules="[
              (v: string) => !!v || 'Este campo es requerido',
              (v: string) => (v && v.length >= 3) || 'Mínimo 3 caracteres',
              (v: string) => (v && v.length <= 20) || 'Máximo 20 caracteres',
              (v: string) => /^[ñA-Za-zÁÉÍÓÚáéíóú]*$/.test(v) || 'Debe ingresar un nombre válido'
            ]"
        placeholder="DBS"
        input-class="text-white"
        color="transparent"
        no-error-icon
        readonly
        outlined
        bg-color="app-input"
        @update:model-value="(v: string) => form.dbs = v.toUpperCase()"
        :model-value="form.dbs" />

      <q-input
        class="col-12 col-md"
        :rules="[
              (v: string) => !!v || 'Este campo es requerido',
              (v: string) => (v && v.length >= 3) || 'Mínimo 3 caracteres',
              (v: string) => (v && v.length <= 20) || 'Máximo 20 caracteres',
              (v: string) => /^[ñA-Za-zÁÉÍÓÚáéíóú]*$/.test(v) || 'Debe ingresar un nombre válido'
            ]"
        placeholder="Nombre"
        input-class="text-white"
        color="transparent"
        no-error-icon
        outlined
        bg-color="app-input"
        v-model="form.nombre" />
    </div>

    <q-input
      class="full-width"
      :rules="[
              (v: string) => !!v || 'Este campo es requerido',
              (v: string | RegExp) => /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i.test(v.toString()) || 'Debe ingresar una URL válida'
            ]"
      placeholder="URL"
      input-class="text-white"
      color="transparent"
      no-error-icon
      outlined
      bg-color="app-input"
      v-model="form.url" />

    <q-input
      class="full-width"
      :rules="form.urlBg ?[
              (v: string | RegExp) => /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i.test(v.toString()) || 'Debe ingresar una URL válida'
            ] : []"
      placeholder="Imagen de fondo. Ej: https://www.example.com/image.jpg"
      input-class="text-white"
      color="transparent"
      no-error-icon
      outlined
      bg-color="app-input"
      v-model="form.urlBg" />

    <div class="row items-center justify-between"
         :class="{ 'wp-100' : $q.screen.lt.md, '' : $q.screen.gt.sm }" style="gap: 15px;">
      <q-input
        class="col-12 col-md"
        :rules="[
              (v: string) => !!v || 'Este campo es requerido',
              (v: string) => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(v) || 'Debe ingresar un UUID válido',
            ]"
        placeholder="Hash"
        input-class="text-white"
        color="transparent"
        no-error-icon
        outlined
        bg-color="app-input"
        v-model="form.hash" />

      <q-input
        class="col-12 col-md"
        :rules="[
              (v: string) => !!v || 'Este campo es requerido',
              (v: string) => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(v) || 'Debe ingresar un UUID válido',
            ]"
        placeholder="Secret"
        input-class="text-white"
        color="transparent"
        no-error-icon
        outlined
        bg-color="app-input"
        v-model="form.secret" />
    </div>

    <div class="wp-100 q-mt-xl flex justify-between">
      <q-btn
        color="app-secondary"
        flat
        @click="() => {
          $router.push('/operadores')
        }"
        class="wp-20 fs-15 py-8 br-6 text-semi-bold"
        no-caps
      >
        Cancelar
        <q-separator color="app-secondary" class="wp-100 q-mt-xs" />
      </q-btn>

      <q-btn
        color="app-secondary"
        unelevated
        type="submit"
        :disable="Object.values(errors).some((e) => e !== null)"
        :loading="updating"
        class="fs-15 br-6 py-8 q-px-xl text-app-primary text-semi-bold"
        no-caps
      >
        {{ update ? 'Actualizar operador' : 'Registrar operador' }}
      </q-btn>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { onMounted, PropType, reactive, ref } from 'vue';
import { QForm } from 'quasar';
import { IForm, IOperator } from '@modules/operators/infrastructure/interfaces';

const props = defineProps({
  updating: {
    type: Boolean,
    default: false,
    required: false
  },
  update: {
    type: Boolean,
    default: false,
    required: false
  },
  errors: {
    type: Object,
    default: () => ({}),
    required: false
  },
  item: {
    type: Object as PropType<IOperator>,
    default: null,
    required: false
  }
});
const emit = defineEmits<{
  (event: 'onSubmit', data: IForm): void;
  (event: 'cleanError', field: string): void;
  (event: 'onUpdate', data: IForm): void;
}>();


const formRef = ref<null | QForm>(null);
const form = reactive<IForm>({
  dbs: 'BETSOLUTIONS',
  nombre: '',
  url: '',
  urlBg: '',
  secret: '',
  hash: ''
});

const onSubmit = (): void =>
{
  formRef.value?.validate().then((isValid: boolean) =>
  {
    if (isValid && !props.update)
    {
      emit('onSubmit', form);
    }
    else if (isValid && props.update)
    {
      emit('onUpdate', form);
    }
  });
};

onMounted(() =>
{
  if (props.update && props.item)
  {
    form.dbs = props.item.dbs;
    form.nombre = props.item.nombre;
    form.url = props.item.url;
    form.urlBg = props.item.urlBg;
    form.secret = props.item.secret;
    form.hash = props.item.hash;
  }
});
</script>

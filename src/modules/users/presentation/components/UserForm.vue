<template>
  <q-form
    class="w-full br-10 q-py-xl q-px-md flex column custom-size-input"
    style="gap: 20px; background-color: #272630;" ref="formRef" greedy @submit.prevent="onSubmit">
    <p v-text="'Ingresa los datos del usuario para continuar'" class="text-semi-bold text-grey-5" />
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
        placeholder="Nombre"
        input-class="text-white"
        color="transparent"
        no-error-icon
        outlined
        bg-color="app-input"
        v-model="form.nombre" />

      <q-input
        class="col-12 col-md"
        :rules="[
              (v: string) => !!v || 'Este campo es requerido',
              (v: string) => (v && v.length >= 3) || 'Mínimo 3 caracteres',
              (v: string) => (v && v.length <= 20) || 'Máximo 20 caracteres',
              (v: string) => /^[ñA-Za-zÁÉÍÓÚáéíóú]*$/.test(v) || 'Debe ingresar un apellido válido'
            ]"
        placeholder="Apellido"
        input-class="text-white"
        color="transparent"
        no-error-icon
        outlined
        bg-color="app-input"
        v-model="form.apellido" />
    </div>

    <q-input
      class="full-width"
      :rules="[
              (v: string) => !!v || 'Este campo es requerido',
              (v: string) => (v && v.length >= 8) || 'Mínimo 8 caracteres',
              (v: string) => (v && v.length <= 50) || 'Máximo 50 caracteres',
              (v: string | RegExp) => /^[\w-\.]+@([\w-]{3,64}\.)+[\w-]{2,4}$/.test(v.toString()) || 'Debe ingresar un correo electrónico válido'
            ]"
      placeholder="Correo electrónico"
      input-class="text-white"
      color="transparent"
      no-error-icon
      outlined
      bg-color="app-input"
      v-model="form.email" />

    <q-input
      class="full-width"
      :rules="[
        (v: string) => !!v || 'Este campo es requerido',
        (v: string) => /^(\+58)?[ ]?4\d{9}$/.test(v) || 'Debe ingresar un número de teléfono válido'
      ]"
      placeholder="Teléfono. Ej: +58 424 123 4567"
      input-class="text-white"
      color="transparent"
      mask="+## ### ### ####"
      unmasked-value
      no-error-icon
      outlined
      bg-color="app-input"
      @update:model-value="(v: string) => form.tlf = `+${v}`"
      :model-value="form.tlf" />

    <q-input
      class="full-width"
      :type="isPwd ? 'password' : 'text'"
      :rules="[
              (v: string) => !!v || 'Este campo es requerido'
            ]"
      placeholder="Contraseña"
      input-class="text-white"
      outlined
      no-error-icon
      v-if="!update"
      color="transparent"
      ref="pInput"
      bg-color="app-input"
      v-model="form.password">
      <template #append>
        <q-icon class="cursor-pointer"
                :name="isPwd ? 'o_visibility' : 'o_visibility_off'"
                :color="$refs.pInput?.hasError ? 'app-danger' : 'grey-4'" @click="isPwd = !isPwd" />
      </template>
    </q-input>

    <div class="wp-100 q-mt-xl flex justify-between">
      <q-btn
        color="app-secondary"
        flat
        @click="() => {
          $router.push('/usuarios')
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
        {{ update ? 'Actualizar usuario' : 'Registrar usuario' }}
      </q-btn>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { onMounted, PropType, reactive, ref } from 'vue';
import { QForm } from 'quasar';
import { Form, IUser } from '@modules/users/infrastructure/interfaces';

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
    type: Object as PropType<IUser>,
    default: null,
    required: false
  }
});
const emit = defineEmits<{
  (event: 'onSubmit', data: Form): void;
  (event: 'cleanError', field: string): void;
  (event: 'onUpdate', data: Form): void;
}>();


const formRef = ref<null | QForm>(null);
const isPwd = ref<boolean>(true);
const form = reactive<Form>({
  nombre: '',
  apellido: '',
  email: '',
  tlf: '',
  password: ''
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
      const data = { ...form };
      delete data.password;
      emit('onUpdate', data);
    }
  });
};

onMounted(() =>
{
  if (props.update && props.item)
  {
    form.nombre = props.item.nombre;
    form.apellido = props.item.apellido;
    form.email = props.item.email;
    form.tlf = props.item.tlf;
  }
});
</script>

<template>
  <section
    style="background-color: #0e003d"
    class="fullscreen text-white text-center q-pa-md flex flex-center">
    <q-card
      :class="{
        'wp-100': $q.screen.lt.md,
        'wp-45' : $q.screen.md,
        'wp-30 q-px-sm': $q.screen.gt.md && $q.screen.lt.xl,
        'wp-25 q-px-sm': $q.screen.gt.lg
      }"
      style="background-color: #272630; z-index: 2; letter-spacing: 0.25px;"
      flat
      class="flex column items-center br-10 q-pt-md q-pb-lg">
     <q-card-section class="q-pb-md">
       <q-img src="/public/images/horse.svg" height="5em" width="8em" />
       <h2 class="text-semi-bold lh-40" style="font-size: clamp(1.2em, 2em, 2.3em)">Bienvenido al panel administrativo</h2>
     </q-card-section>

      <q-card-section class="q-pt-none wp-100 flex">
        <p v-text="'Ingresa tus datos para continuar'" class="text-semi-bold text-grey-5" />
        <q-form @submit.prevent="onSubmit" greedy class="q-gutter-y-lg full-width custom-size-input">
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
            :type="isPwd ? 'password' : 'text'"
            :rules="[
              (v: string) => !!v || 'Este campo es requerido'
            ]"
            placeholder="Contraseña"
            input-class="text-white"
            outlined
            no-error-icon
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
          <a href="/" class="block fs-14 text-right q-mt-sm cursor-pointer wp-100 text-app-secondary">
            ¿Olvidaste tu contraseña?
          </a>

          <q-btn
            label="Ingresar"
            no-caps
            type="submit"
            :loading="loading"
            :disable="loading"
            color="app-secondary"
            class="full-width mt-90 py-10 br-6 text-app-primary text-semi-bold"
            unelevated
          />
        </q-form>
      </q-card-section>
    </q-card>

    <q-img class="absolute-bottom" src="public/images/bgImg.svg" />
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { LoginUseCase } from '@modules/auth/domain/useCases';
import { QForm } from 'quasar';
import { AxiosError } from 'axios';
import { NotifyFn } from '@common/utils/notify.util';
import { NotificationEnum } from '@common/constants';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ useScope: 'global' });

const loading = ref<boolean>(false);
const isPwd = ref<boolean>(true);
const form = reactive<{
  email: string;
  password: string;

}>({
  email: '',
  password: ''
});

const onSubmit = async(): Promise<void> =>
{
  loading.value = true;

  try
  {
    await LoginUseCase.handle(form);
  }
  catch (e: AxiosError | any)
  {
    console.log(e);
    loading.value = false;
    const key = e.response.data.message.split(' ');
    key.map((item: string, index: number) => index > 0 ? key[index] = item.charAt(0).toUpperCase() + item.slice(1) : key[index] = item);
    NotifyFn(
      NotificationEnum.ERROR,
      t(`BackMessages.auth.${key.join('')}.title`),
      5000,
      t(`BackMessages.auth.${key.join('')}.caption`)
    );
  }
};
</script>

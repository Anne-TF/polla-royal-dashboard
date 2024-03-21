<template>
  <q-page class="q-pa-lg flex justify-center main-wh">

    <div class="self-start">
      <h1 class="text-app-secondary text-weight-bold q-mb-md q-mt-md fs-28" :class="{ 'fs-20' : $q.screen.lt.md }">
        {{ $t('messages.auth.pages.login.title') }}
      </h1>

      <div class="w-40 h-2 divider-app-primary"></div>

      <p class="mt-20 text-weight-regular"
         style="font-size: clamp(1rem, 3vw, 1.5rem)"
      >
        {{ $t('messages.auth.pages.login.messages.1') }}
      </p>
    </div>


    <q-form
      class="self-end flex column wp-100 hp-60-vh"
      ref="formRef"
      @submit="handleLogin"
    >

       <q-img
         :src="'/images/graphic-login.svg'"
         fit="contain"
         class="login_form-img hp-36"
       />

       <q-space />

       <q-input
         outlined
         :label="$t('messages.auth.pages.login.inputs.email')"
         color="app-primary"
         v-model.trim="formAuth.emailOrPhone"
         type="email"
         ref="emailInp"
         placeholder="admin@email.com"
         class="mb-16"
         :rules="[
           validate('emailOrPhone')
         ]"
       />

      <q-input
        outlined
        :label="$t('messages.auth.pages.login.inputs.password')"
        color="app-primary"
        v-model.trim="formAuth.password"
        :type="isPwd ? 'password' : 'text'"
        ref="emailInp"
        placeholder="*******"
        class="mb-16"
        :rules="[
           validate('password')
         ]"
      >
        <template v-slot:append>
          <q-icon
            class="cursor-pointer"
            @click="isPwd = !isPwd"
            color="black"
          >
            <svg
              v-if="isPwd"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 9.005a4 4 0 1 1 0 8a4 4 0 0 1 0-8ZM12 5.5c4.613 0 8.596 3.15 9.701 7.564a.75.75 0 1 1-1.455.365a8.504 8.504 0 0 0-16.493.004a.75.75 0 0 1-1.456-.363A10.003 10.003 0 0 1 12 5.5Z"
              />
            </svg>

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M2.22 2.22a.75.75 0 0 0-.073.976l.073.084l4.034 4.035a9.986 9.986 0 0 0-3.955 5.75a.75.75 0 0 0 1.455.364a8.49 8.49 0 0 1 3.58-5.034l1.81 1.81A4 4 0 0 0 14.8 15.86l5.919 5.92a.75.75 0 0 0 1.133-.977l-.073-.084l-6.113-6.114l.001-.002l-6.95-6.946l.002-.002l-1.133-1.13L3.28 2.22a.75.75 0 0 0-1.06 0ZM12 5.5c-1 0-1.97.148-2.889.425l1.237 1.236a8.503 8.503 0 0 1 9.899 6.272a.75.75 0 0 0 1.455-.363A10.003 10.003 0 0 0 12 5.5Zm.195 3.51l3.801 3.8a4.003 4.003 0 0 0-3.801-3.8Z"
              />
            </svg>
          </q-icon>
        </template>
      </q-input>

      <q-btn
        no-caps
        unelevated
        :loading="loading"
        color="app-secondary"
        class="wp-100 py-10 text-white br-8"
        :label="$t('messages.auth.pages.login.buttons.submit')"
        type="submit"
      />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { QForm } from 'quasar';
import { LoginUseCase } from '@modules/auth/domain/useCases';
import { useRouter } from 'vue-router';

const $router = useRouter();

const formRef = ref<QForm | null>(null);
const loading = ref<boolean>(false);
const isPwd = ref<boolean>(true);

const formAuth = reactive({
  emailOrPhone: 'superadmin@baserepository.com',
  password: 'b4s3r3p0s1t0ry'
});

const validate = LoginUseCase.validateAt;

const handleLogin = async() =>
{
  loading.value = true;

  void await formRef.value.validate();

  try
  {
    await LoginUseCase.handle(formAuth);
    await $router.push('/dashboard');
  }
  catch (e)
  { }

  loading.value = false;

};

</script>

<style lang="sass" scoped>

</style>

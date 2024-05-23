<template>
  <q-page class="q-px-lg q-pt-sm">
    <section class="flex column items-center q-mx-auto pt-percentage-2"
             :class="{ 'wp-93' : $q.screen.lt.md, 'wp-50' : $q.screen.md, 'wp-40' : $q.screen.gt.md }">
      <h1 class="text-semibold text-white pb-percentage-4" style="font-size: clamp(1.6em, 2vw, 2em)" v-text="'Crear nuevo usuario'" />
      <div class="wp-100">
        <UserForm :updating="loading" @on-submit="onSubmit" />
      </div>
    </section>
  </q-page>
</template>
<script setup lang="ts">
import UserForm from '@modules/users/presentation/components/UserForm.vue';
import { Form } from '@modules/users/infrastructure/interfaces';
import { ref } from 'vue';
import { CreateUserUseCase } from '@modules/users/domain/useCases';
import { AxiosError } from 'axios';
import { NotifyFn } from '@common/utils/notify.util';
import { NotificationEnum } from '@common/constants';

const loading = ref<boolean>(false);

const onSubmit = async(data: Form): Promise<void> =>
{
  try
  {
    loading.value = true;
    await CreateUserUseCase.handle(data);
    NotifyFn(
      NotificationEnum.SUCCESS,
      '¡Todo listo!',
      5000,
      'Se ha creado un nuevo usuario exitosamente'
    );
  }
  catch (err: AxiosError | any)
  {
    console.error(err);
  }
  finally
  {
    loading.value = false;
  }
};
</script>

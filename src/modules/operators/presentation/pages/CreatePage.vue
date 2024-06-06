<template>
  <q-page class="q-px-lg q-pt-sm">
    <section class="flex column items-center q-mx-auto pt-percentage-2"
             :class="{ 'wp-93' : $q.screen.lt.md, 'wp-50' : $q.screen.md, 'wp-40' : $q.screen.gt.md }">
      <h1 class="text-semibold text-white pb-percentage-4" style="font-size: clamp(1.6em, 2vw, 2em)" v-text="'Crear nuevo operador'" />
      <div class="wp-100">
        <OperatorsForm :updating="loading" @on-submit="onSubmit" />
      </div>
    </section>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { AxiosError } from 'axios';
import { NotifyFn } from '@common/utils/notify.util';
import { NotificationEnum } from '@common/constants';
import { CreateOperatorUseCase } from '@modules/operators/domain/useCases';
import { IForm } from '@modules/operators/infrastructure/interfaces';
import { OperatorsForm } from '@modules/operators/presentation/components';

const loading = ref<boolean>(false);

const onSubmit = async(data: IForm): Promise<void> =>
{
  try
  {
    loading.value = true;
    await CreateOperatorUseCase.handle(data);
    NotifyFn(
      NotificationEnum.SUCCESS,
      '¡Todo listo!',
      5000,
      'Se ha creado un nuevo operador exitosamente'
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

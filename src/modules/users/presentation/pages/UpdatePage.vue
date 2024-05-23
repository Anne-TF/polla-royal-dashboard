<template>
  <q-page class="q-px-lg q-pt-sm">
    <section class="flex column items-center q-mx-auto pt-percentage-2"
             :class="{ 'wp-93' : $q.screen.lt.md, 'wp-50' : $q.screen.md, 'wp-40' : $q.screen.gt.md }">
      <h1 class="text-semibold text-white pb-percentage-4" style="font-size: clamp(1.6em, 2vw, 2em)" v-text="'Actualizar usuario'" />
      <div class="wp-100">
        <UserForm v-if="item" :item="item" update :updating="loading" @on-update="onSubmit" />
        <q-card
          style="gap: 20px; background-color: #272630;"
          class="w-full br-10 q-py-xl q-px-md flex column" v-else>
          <q-skeleton type="text" class="wp-80" height="2em" />
          <div class="row items-center justify-between" :class="{ 'wp-100' : $q.screen.lt.md, '' : $q.screen.gt.sm }" style="gap: 15px;">
            <q-skeleton height="3em" class="col-12 col-md" type="QInput" />
            <q-skeleton height="3em" class="col-12 col-md" type="QInput" />
          </div>

          <q-skeleton class="q-my-lg" height="3em" type="QInput" />
          <q-skeleton height="3em" type="QInput" />

          <div class="wp-100 q-mt-xl flex justify-between">
            <q-skeleton height="3em" class="wp-40" type="QInput" />
            <q-skeleton height="3em" class="wp-40" type="QInput" />
          </div>
        </q-card>
      </div>
    </section>
  </q-page>
</template>
<script setup lang="ts">
import UserForm from '@modules/users/presentation/components/UserForm.vue';
import { Form, IUser } from '@modules/users/infrastructure/interfaces';
import { onMounted, ref } from 'vue';
import { AxiosError } from 'axios';
import { NotifyFn } from '@common/utils/notify.util';
import { NotificationEnum } from '@common/constants';
import { GetUserUseCase, UpdateUserUseCase } from '@modules/users/domain/useCases';
import { useRoute } from 'vue-router';

const $route = useRoute();

const loading = ref<boolean>(false);
const item = ref<IUser | null>(null);

const onSubmit = async(data: Partial<Form>): Promise<void> =>
{
  try
  {
    loading.value = true;
    await UpdateUserUseCase.handle($route.params.id as string, data);
    NotifyFn(
      NotificationEnum.SUCCESS,
      '¡Todo listo!',
      5000,
      'Se ha actualizado el usuario exitosamente'
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

onMounted(async() =>
{
  item.value = (await GetUserUseCase.handle($route.params.id as string))?.data?.data;
});
</script>

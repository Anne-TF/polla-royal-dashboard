<template>
  <div class="fullscreen  bg-app-tertiary text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 5vh" class="flex column items-center">
        <q-img
          :src="configuration().s3Url?.concat($route.query.integration as string, '.png')"
          height="4em"
          fit="cover"
          width="4em"
        />
       <div class="flex items-center">
         Cargando
         <q-img width="2em" src="gifs/horse.gif" />
       </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { LoginUseCase } from '@modules/auth/domain/useCases';
import { useRouter } from 'vue-router';
import configuration from '@config/configuration';

const $router = useRouter();

onMounted(async() =>
{

  await LoginUseCase.handle($router.currentRoute.value.query);

  setTimeout(() =>
  {
    $router.push('/polla');
  }, 1500);
});
</script>

<style scoped lang="scss">
.loader, .loader:before, .loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  animation-fill-mode: both;
  animation: bblFadInOut 1.8s infinite ease-in-out;
}
.loader {
  color: #FFF;
  font-size: 7px;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}

@keyframes bblFadInOut {
  0%, 80%, 100% { box-shadow: 0 2.5em 0 -1.3em }
  40% { box-shadow: 0 2.5em 0 0 }
}

</style>

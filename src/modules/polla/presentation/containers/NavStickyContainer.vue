<template>
  <q-page-sticky expand position="top" class="wp-100 bg-app-primary q-py-md" style="margin-top: -10px">
    <q-toolbar class="flex column" style="align-items: end !important;">
      <div style="font-size: clamp(1.5vw, 3.5vw, 4vw)" class="flex wp-100 justify-between items-center q-mt-sm">
        <AppSelectComponent
          :data="selectHippodromes"
          :defaultSelect="selectHippodromes[0]"
          :allowChange="!pollaStore.Betting"
          :confirmationMessage="'¿Estás seguro de cambiar de hipódromo? Posees una apuesta en curso.'"
          @onSelect="handleSelect" />
        <AccumulatedAmountComponent :amount="amount"/>
      </div>

      <OptionSwitchComponent :default-option="switchOptions.default" :options="switchOptions.options" @onSwitch="handleSwitch"/>
    </q-toolbar>
  </q-page-sticky>

</template>

<script setup lang="ts">
import { OptionSwitchComponent, AppSelectComponent } from '@common/components';
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import { AccumulatedAmountComponent } from '../components';
import { GetHippodromesUseCase } from '@modules/polla/domain/useCases';
import { usePollaStore } from '@modules/polla/domain/store';

const pollaStore = usePollaStore();

const selectHippodromes = ref([]);
const amount = ref(5000);

const handleSwitch = (selectedOption: string) =>
{
  console.log('La opción seleccionada es: ', selectedOption);
};

const handleSelect = (selectedOption: string) =>
{
  console.log(pollaStore.Betting)

  pollaStore.setSelectedHippodrome(selectedOption);
};


const switchOptions = {
  default: 'play',
  options: [
    {
      name: 'Jugar',
      value: 'play'
    },
    {
      name: 'Historial',
      value: 'history'
    }
  ]
};

setTimeout(() =>
{
  amount.value = 5100;
}, 2000);

setTimeout(() =>
{
  amount.value = 5020;
}, 4000);

setTimeout(() =>
{
  amount.value = 4500;
}, 6000);

watch(() => pollaStore.Hippodromes, (newValue) =>
{

  if (!newValue.length)
  {
    return;
  }

  selectHippodromes.value = newValue.map((hippodrome) => ({
    name: hippodrome.name,
    value: hippodrome.id,
    suffix: '19/03'
  }));

  handleSelect(selectHippodromes.value[0].value);
}, { immediate: true, deep: true });

onMounted(async() =>
{
  await GetHippodromesUseCase.handle();
});


</script>

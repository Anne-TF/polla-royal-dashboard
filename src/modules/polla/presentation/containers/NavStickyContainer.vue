<template>
  <q-page-sticky
    expand position="top" class="wp-100 bg-app-primary q-py-md" style="margin-top: -10px">
    <q-toolbar
      :class="{
        'wp-50 q-mx-auto' : $q.screen.gt.md
      }"
      class="flex column" style="align-items: end !important;">
      <div style="font-size: clamp(.5rem, 1rem, 2rem)" class="flex wp-100 justify-between items-center q-mt-sm">
        <AppSelectComponent
          :data="selectHippodromes"
          :defaultSelect="selectHippodromes[0]"
          :allowChange="!pollaStore.Betting"
          :confirmationMessage="'¿Estás seguro de cambiar de hipódromo? Posees una apuesta en curso.'"
          @onSelect="handleSelect"
        />
        <OptionSwitchComponent :defaultOption="switchOptions.default" :options="switchOptions.options" @onSwitch="handleSwitch"/>
      </div>

      <div style="font-size: clamp(.5rem, 1rem, 2rem)" class="section-two mt-16">
        <AccumulatedAmountComponent :amount="pot" :type="'Pote'"/>
        <AccumulatedAmountComponent :amount="10" type="Ticket"/>
      </div>

    </q-toolbar>
  </q-page-sticky>

</template>

<script setup lang="ts">
import { OptionSwitchComponent, AppSelectComponent } from '@common/components';
import { onMounted, reactive, ref, watch } from 'vue';
import { AccumulatedAmountComponent } from '../components';
import { GetHippodromesUseCase, GetPotUseCase } from '@modules/polla/domain/useCases';
import { usePollaStore } from '@modules/polla/domain/store';
import { OptionsTap } from '@modules/polla/domain/store/types';

const pollaStore = usePollaStore();

const selectHippodromes = ref([]);
const pot = ref(0);

const switchOptions = reactive({
  default: 'play',
  options: [
    {
      name: 'Jugar',
      value: 'play',
      disabled: false
    },
    {
      name: 'Historial',
      value: 'history'
    }
  ]
});

const handleSwitch = (selectedOption: OptionsTap) =>
{
  pollaStore.setOptionSelected(selectedOption);
};

const handleSelect = (selectedOption: string) =>
{
  pollaStore.setSelectedHippodrome(selectedOption);
};

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

watch(() => pollaStore.SelectedHippodrome, async(newValue) =>
{
  switchOptions.default = pollaStore.OptionSelected;

  switchOptions.options[0].disabled = !newValue?.allowsPlay;

  if (newValue?.id)
  {
    await GetPotUseCase.handle(newValue.id);
  }

}, { immediate: true, deep: true });

watch(() => pollaStore.Pot, (newValue) =>
{
  pot.value = newValue;
}, { immediate: true, deep: true });

onMounted(async() =>
{
  await Promise.all([
    GetHippodromesUseCase.handle()
  ]);
});

</script>

<style scoped lang="scss">

.section-one {
  display: grid;
  //column-gap: 14rem;
  //row-gap: 1rem;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  width: 100%;
  text-overflow: ellipsis;
}

.section-two {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  width: 100%;
  direction: rtl;
}
</style>


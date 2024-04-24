<template>
  <q-page-sticky
    expand position="top" class="wp-100 q-py-md pb-40"
    style="
      background: linear-gradient(180deg, rgba(18,13,60,1) 80%, rgba(18,13,60,0.6362920168067228) 90%, rgba(18,13,60,0) 95%);
      margin-top: -10px
    "
  >
    <q-toolbar
      :class="{
        'wp-50 q-mx-auto' : $q.screen.gt.md
      }"
      class="flex column" style="align-items: end !important;">
      <div style="font-size: clamp(.5rem, 1rem, 2rem)" class="flex wp-100 justify-between items-center q-mt-sm">
        <AppSelectComponent
          :data="selectHippodromes"
          :defaultSelect="hippodromeSelected"
          :allowChange="!pollaStore.Betting"
          :confirmationMessage="'¿Estás seguro de cambiar de hipódromo? Posees una apuesta en curso.'"
          @onSelect="handleSelect"
        />
        <OptionSwitchComponent :defaultOption="switchOptions.default" :options="switchOptions.options" @onSwitch="handleSwitch"/>
      </div>

      <div style="font-size: clamp(.5rem, 1.2rem, 2rem)" class="section-two mt-16">
        <AccumulatedAmountComponent :amount="pot ?? 0" :type="'Pote'"/>
        <AccumulatedAmountComponent :amount="pollaStore.Ticket?.amount ?? 0" type="Ticket" :currency="pollaStore.Ticket?.currency" />
      </div>
    </q-toolbar>
  </q-page-sticky>
</template>

<script setup lang="ts">
import { AppSelectComponent, OptionSwitchComponent } from '@common/components';
import { onBeforeMount, reactive, ref, watch } from 'vue';
import { AccumulatedAmountComponent } from '../components';
import { GetHippodromesUseCase, GetPotUseCase } from '@modules/polla/domain/useCases';
import { usePollaStore } from '@modules/polla/domain/store';
import { OptionsTap } from '@modules/polla/domain/store/types';
import { useRouter } from 'vue-router';
import { Hippodrome } from '@modules/polla/domain/models';

const $router = useRouter();

const pollaStore = usePollaStore();

const selectHippodromes = ref([]);
const pot = ref(0);
const hippodromeSelected = ref();

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
      value: 'history',
      disabled: false
    }
  ]
});

const options = ['play', 'history'];

const handleSwitch = async(selectedOption: OptionsTap) =>
{
  selectedOption = pollaStore.SelectedHippodrome.allowsPlay ? selectedOption : 'history';
  switchOptions.default = selectedOption;
  pollaStore.setOptionSelected(selectedOption);
  await $router.replace({  path: $router.currentRoute.value.path, query: { ...$router.currentRoute.value.query, tab: selectedOption  } });
};

const handleSelect = async(selectedOption: string) =>
{
  pollaStore.setSelectedHippodrome(selectedOption);
  await $router.replace({ path: $router.currentRoute.value.path, query: { ...$router.currentRoute.value.query, hippodrome: selectedOption } });
};

const mapHippodrome = (hippodrome: Hippodrome) => ({
  name: hippodrome.name,
  value: hippodrome.id,
  suffix: hippodrome.date
});

const getHippodrome = (hippodromes: Hippodrome[]) =>
{
  const hippodromeId = $router.currentRoute.value.query?.hippodrome;

  if (hippodromeId)
  {
    return mapHippodrome(hippodromes.find(hippodrome => hippodrome.id === hippodromeId));
  }

  return mapHippodrome(hippodromes[0]);
};

// TODO: revisar el cambio de la url, esta no se esta haciendo correctamente !

watch(() => pollaStore.Hippodromes, (newValue) =>
{
  if (!newValue.length)
  {
    return;
  }

  selectHippodromes.value = newValue.map(mapHippodrome);

  hippodromeSelected.value = getHippodrome(newValue);

  handleSelect(hippodromeSelected.value.value);
}, { deep: true });

watch(() => pollaStore.SelectedHippodrome, async(newValue) =>
{
  switchOptions.default = pollaStore.OptionSelected;

  switchOptions.options[0].disabled = !newValue?.allowsPlay;

  if (newValue?.id)
  {
    await GetPotUseCase.handle(newValue.id);
  }
}, { deep: true });

watch(() => pollaStore.Pot, (newValue) =>
{
  pot.value = newValue;
}, { deep: true });

onBeforeMount(async() =>
{
  await GetHippodromesUseCase.handle();

  if (!pollaStore.Hippodromes.length)
  {
    await $router.push('/no-hippodromes');
  }

  const hippodromeId = $router.currentRoute.value.query?.hippodrome as string;
  const optionTab = $router.currentRoute.value.query?.tab as OptionsTap;

  if (hippodromeId)
  {
    hippodromeSelected.value = getHippodrome(pollaStore.Hippodromes);
    await handleSelect(hippodromeId);
  }

  if (optionTab && options.includes(optionTab))
  {
    await handleSwitch(optionTab);
  }
  else
  {
    await handleSwitch('play');
  }
});

</script>

<style scoped lang="scss">
.section-two {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  width: 100%;
  direction: rtl;
}
</style>


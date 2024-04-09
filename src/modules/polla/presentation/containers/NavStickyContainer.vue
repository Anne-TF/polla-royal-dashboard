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
  pollaStore.setOptionSelected(selectedOption);
};

const handleSelect = async(selectedOption: string) =>
{
  pollaStore.setSelectedHippodrome(selectedOption);
  await $router.replace({ query: { ...$router.currentRoute.value.query, hippodrome: selectedOption } });
};

const mapHippodrome = (hippodrome: Hippodrome) => ({
  name: hippodrome.name,
  value: hippodrome.id,
  suffix: '19/03'
});

watch(() => pollaStore.Hippodromes, (newValue) =>
{
  if (!newValue.length)
  {
    return;
  }

  selectHippodromes.value = newValue.map(mapHippodrome);

  hippodromeSelected.value = selectHippodromes.value[0];

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

watch(() => pollaStore.OptionSelected, async(newValue) =>
{
  await $router.replace({ query: { ...$router.currentRoute.value.query, tab: newValue  } });
});

onMounted(async() =>
{
  await Promise.all([
    GetHippodromesUseCase.handle()
  ]);

  const optionTab = $router.currentRoute.value.query?.tab.toString() as OptionsTap;
  const hippodromeId = $router.currentRoute.value.query?.hippodrome as string;

  if (options.includes(optionTab))
  {
    switchOptions.default = optionTab;
    await handleSwitch(optionTab);
  }

  if (hippodromeId)
  {
    const _hippodrome_ = pollaStore.Hippodromes.find((_hippodrome) => _hippodrome.id === hippodromeId);
    hippodromeSelected.value = mapHippodrome(_hippodrome_);
    await handleSelect(hippodromeId);
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


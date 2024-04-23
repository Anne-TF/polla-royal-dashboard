<template>
  <div class="flex column items-end">
    <span class="text-app-primary-300">Saldo <q-icon size="1.3em" class="q-ml-sm" @click="hidden = !hidden" :name="hidden ? 'visibility' : 'visibility_off'" /> </span>
    <p style="font-size: clamp(1.5rem, 2.5rem, 3rem);" class="text-app-primary-100 text-center" >
      <span v-if="!loading" @click="hidden || onClick()" class="mr-8">{{ hidden ? '*******' :  authStore.GetBalance(currency) }}</span>
      <q-spinner
        v-if="loading"
        color="app-secondary"
        size=".8em"
        class="mr-8"
      />
      <span v-if="loading" class="loader mr-8"></span>
      <span class="fs-13">{{ currency }}
        <q-icon v-if="authStore.GetCurrencies.length > 1" size="1.2em" style="margin-top: -5px;" color="text-app-primary-100" name="arrow_drop_down" >
          <q-menu :no-parent-event="loading" anchor="bottom right" self="top right" class="bg-app-primary fs-16 text-medium shadow-13" :offset="[0,10]" auto-close >
            <q-list>
              <q-item clickable v-for="(_currency_, key) in authStore.GetCurrencies" :key @click="changeCurrency(_currency_)"
                      :active="currency === _currency_"
                      active-class="bg-app-primary-800 text-app-secondary">
                <q-item-section>{{ _currency_ }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-icon>
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@modules/auth/domain/store';
import { GetBalancesUseCase } from '@modules/auth/domain/useCases';

const authStore = useAuthStore();

const currency = ref();
const loading = ref<boolean>(false);

const changeCurrency = (value: string) => currency.value = value;

const onClick = async() =>
{
  loading.value = true;

  await GetBalancesUseCase.handle();

  loading.value = false;
};

onMounted(() =>
{
  currency.value = authStore.GetDefaultCurrency
});

const hidden = ref<boolean>(false);
</script>

<template>
  <div class="flex column items-end">
    <span class="text-app-primary-300">Saldo <q-icon size="1.3em" class="q-ml-sm" @click="hidden = !hidden" :name="hidden ? 'visibility' : 'visibility_off'" /> </span>
    <p style="font-size: clamp(1.5rem, 2.5rem, 3rem);" class="text-app-primary-100">
      {{ hidden ? '*******' :  amount[currency] }}
      <span class="fs-13">{{ currency }}
        <q-icon size="1.2em" style="margin-top: -5px;" color="text-app-primary-100" name="arrow_drop_down" />
          <q-menu anchor="bottom right" self="top right" class="bg-app-primary fs-16 text-medium shadow-13" :offset="[0,10]" auto-close >
            <q-list>
              <q-item clickable v-for="(_currency_, key) in currencies" :key @click="changeCurrency(_currency_)"
                      :active="currency === _currency_"
                      active-class="bg-app-primary-800 text-app-secondary">
                <q-item-section>{{ _currency_ }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const amount = ref({
  USD: 100.35,
  VES: 1000.35
});

const currencies = ref<string[]>(['USD', 'VES']);

const currency = ref('USD');

const changeCurrency = (value: string) => currency.value = value;

const hidden = ref<boolean>(false);
</script>

import { defineStore } from 'pinia';
import '@app/plugins/piniaPersist/core/types';
import state from './state';
import getters from './getters';
import actions from './actions';

export const usePollaStore = defineStore('polla', {
  state,
  getters,
  actions,
  persist: false
});

export type PollaStore = typeof usePollaStore



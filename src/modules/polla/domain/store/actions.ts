import { PiniaActions } from './types';

const actions: PiniaActions = {
  setHippodromes(hippodromes)
  {
    this.hippodromes = hippodromes;
  },
  setSelectedHippodrome(id)
  {
    this.selectedHippodrome = this.hippodromes.find((h) => h.id === id) || null;
  }
};

export default actions;

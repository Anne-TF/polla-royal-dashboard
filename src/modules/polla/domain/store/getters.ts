import { PiniaGetters, State } from './types';

const getters: PiniaGetters = {
  GetHippodromes: (state: State) =>
  {
    return state.hippodromes;
  },
  GetSelectedHippodrome: (state: State) =>
  {
    return state.selectedHippodrome;
  }
};

export default getters;

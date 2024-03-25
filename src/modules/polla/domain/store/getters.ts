import { PiniaGetters, State } from './types';

const getters: PiniaGetters = {
  Hippodromes: (state: State) =>
  {
    return state.hippodromes;
  },
  SelectedHippodrome: (state: State) =>
  {
    return state.selectedHippodrome;
  },
  Bet: (state: State) =>
  {
    return state.bet;
  },
  Betting: (state: State) =>
  {
    return Object.values(state.bet.races).some((r) => r.length);
  }
};

export default getters;

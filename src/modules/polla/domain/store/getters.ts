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
  },
  OptionSelected: (state: State) =>
  {
    return state.optionSelected;
  },
  Pot:(state: State) =>
  {
    return state.pot;
  },
  Ticket: (state: State) =>
  {
    return state.selectedHippodrome?.ticket;
  }
};

export default getters;

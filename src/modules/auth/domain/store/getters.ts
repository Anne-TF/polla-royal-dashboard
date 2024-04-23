import { PiniaGetters, State } from './types';

const getters: PiniaGetters = {
  GetToken: (state: State) =>
  {
    return state.prToken;
  },
  GetCurrencies: (state: State) =>
  {
    return state.currencies;
  },
  GetBalance: (state: State) =>
  {
    return (currency: string) =>
    {
      return state.balances[currency];
    };
  },
  GetDefaultCurrency: (state: State) =>
  {
    return state.defaultCurrency;
  }
};

export default getters;

import { Store } from 'pinia';
import { PiniaActionAdaptor, PiniaGetterAdaptor } from '@stores/types';

export type State = {
  prToken: string | null;
  balances: Record<string, number>;
  currencies: string[];
  defaultCurrency: string | null;
}

export type Getters = {
  GetToken: string | null;
  GetCurrencies: string[];
  GetBalance: (currency: string) => number | undefined;
  GetDefaultCurrency: string | null;
};

export type Actions = {
  setToken: (value: string | null) => void;
  setBalances: (balances: Record<string, number>) => void;
  setDefaultCurrency: (currency: string) => void;
  logout: () => void;
};

export type PiniaStore = Store<'auth', State, Getters, Actions>;

export type PiniaActions = PiniaActionAdaptor<Actions, PiniaStore>;

export type PiniaGetters = PiniaGetterAdaptor<Getters, PiniaStore>;

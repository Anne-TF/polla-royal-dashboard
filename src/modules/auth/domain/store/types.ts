import { Store } from 'pinia';
import { PiniaActionAdaptor, PiniaGetterAdaptor } from '@stores/types';

export type State = {
  prToken: string | null;
}

export type Getters = {
  GetToken: string | null;
};

export type Actions = {
  setToken: (value: string | null) => void;
  logout: () => void;
};

export type PiniaStore = Store<'auth', State, Getters, Actions>;

export type PiniaActions = PiniaActionAdaptor<Actions, PiniaStore>;

export type PiniaGetters = PiniaGetterAdaptor<Getters, PiniaStore>;

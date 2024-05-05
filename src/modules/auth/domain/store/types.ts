import { Store } from 'pinia';
import { PiniaActionAdaptor, PiniaGetterAdaptor } from '@stores/types';
import { IUser } from '@modules/dashboard/infrastructure/interfaces';

export type State = {
  prToken: string | null;
  user: IUser | null;
  isSuperAdmin: boolean;
}

export type Getters = {
  GetToken: string | null;
  GetIsSuperAdmin: boolean;
  GetUser: IUser | null;
};

export type Actions = {
  setToken: (value: string | null) => void;
  setIsSuperAdmin: (value: boolean) => void;
  setUser: (value: IUser | null) => void;
  logout: () => void;
};

export type PiniaStore = Store<'auth', State, Getters, Actions>;

export type PiniaActions = PiniaActionAdaptor<Actions, PiniaStore>;

export type PiniaGetters = PiniaGetterAdaptor<Getters, PiniaStore>;

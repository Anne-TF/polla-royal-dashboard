import { Store } from 'pinia';
import { PiniaActionAdaptor, PiniaGetterAdaptor } from '@stores/types';
import { Hippodrome } from '@modules/polla/domain/models';

export type State = {
  hippodromes: Hippodrome[];
  selectedHippodrome: Hippodrome | null;
}

export type Getters = {
  GetHippodromes: Hippodrome[];
  GetSelectedHippodrome: Hippodrome | null;
};

export type Actions = {
  setHippodromes: (value: Hippodrome[]) => void;
  setSelectedHippodrome: (value: string) => void;
};

export type PiniaStore = Store<'polla', State, Getters, Actions>;

export type PiniaActions = PiniaActionAdaptor<Actions, PiniaStore>;

export type PiniaGetters = PiniaGetterAdaptor<Getters, PiniaStore>;

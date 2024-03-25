import { Store } from 'pinia';
import { PiniaActionAdaptor, PiniaGetterAdaptor } from '@stores/types';
import { Hippodrome } from '@modules/polla/domain/models';

export type OptionsTap = 'play' | 'history'

export type State = {
  hippodromes: Hippodrome[];
  selectedHippodrome: Hippodrome | null;
  optionSelected: OptionsTap;
  bet: {
    hippodromeId: string;
    races: {
      [raceId: string]: string[]
    }
  }
}

export type Getters = {
  Hippodromes: Hippodrome[];
  SelectedHippodrome: Hippodrome | null;
  Bet: State['bet'];
  Betting: boolean;
  OptionSelected: OptionsTap;
};

export type Actions = {
  setHippodromes: (value: Hippodrome[]) => void;
  setSelectedHippodrome: (value: string) => void;
  setBetOfRace: (cardId: string, runners: string[]) => void;
  setOptionSelected: (value: OptionsTap) => void;
};

export type PiniaStore = Store<'polla', State, Getters, Actions>;

export type PiniaActions = PiniaActionAdaptor<Actions, PiniaStore>;

export type PiniaGetters = PiniaGetterAdaptor<Getters, PiniaStore>;

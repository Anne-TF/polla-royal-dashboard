import { State } from './types';

const state = (): State =>
{
  return {
    hippodromes: [],
    selectedHippodrome: null,
    optionSelected: 'play',
    bet: {
      hippodromeId: null,
      races: {}
    },
    pot: 0
  };
};

export default state;

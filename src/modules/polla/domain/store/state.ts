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
    pot: 0,
    exceededCombinations: false
  };
};

export default state;

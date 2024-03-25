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
    }
  };
};

export default state;

import { State } from './types';

const state = (): State =>
{
  return {
    hippodromes: [],
    selectedHippodrome: null,
    bet: {
      hippodromeId: null,
      races: {}
    }
  };
};

export default state;

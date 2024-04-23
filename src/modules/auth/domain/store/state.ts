import { State } from './types';

const state = (): State =>
{
  return {
    prToken: null,
    balances: null,
    currencies: [],
    defaultCurrency: null
  };
};

export default state;

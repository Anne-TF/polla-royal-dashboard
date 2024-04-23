import { PiniaActions } from './types';

const actions: PiniaActions = {
  setToken(value)
  {
    this.prToken = value;
  },
  setBalances(balances)
  {
    this.balances = balances;
    this.currencies = Object.keys(balances);
  },
  setDefaultCurrency(currency)
  {
    if (!this.currencies.includes(currency))
    {
      this.defaultCurrency = this.currencies[0];
    }
    else
    {
      this.defaultCurrency = currency;
    }
  },
  logout()
  {
    this.prToken = null;
    this.router.push('/');
  }
};

export default actions;

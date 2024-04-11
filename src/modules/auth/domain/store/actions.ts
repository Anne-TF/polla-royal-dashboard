import { PiniaActions } from './types';

const actions: PiniaActions = {
  setToken(value)
  {
    this.prToken = value;
  },
  logout()
  {
    this.prToken = null;
    this.router.push('/');
  }
};

export default actions;

import { PiniaActions } from './types';

const actions: PiniaActions = {
  setToken(value)
  {
    this.prToken = value;
  },
  setIsSuperAdmin(value)
  {
    this.isSuperAdmin = value;
  },
  setUser(value)
  {
    this.user = value;
  },
  logout()
  {
    this.prToken = null;
    this.user = null;
    this.router.push('/');
  }
};

export default actions;

import { PiniaActions } from './types';

const actions: PiniaActions = {
  setUser(value)
  {
    this.bmUser = value;
  },
  updateUserFiled(field, value): void
  {
    this.bmUser[field] = value;
  },
  setToken(value)
  {
    this.bmToken = value;
  },
  logout()
  {
    this.bmUser = null;
    this.bmToken = null;
    this.router.push('/');
  }
};

export default actions;

import { PiniaGetters, State } from './types';

const getters: PiniaGetters = {
  GetToken: (state: State) =>
  {
    return state.prToken;
  },
  GetIsSuperAdmin: (state: State) =>
  {
    return state.isSuperAdmin;
  },
  GetUser: (state: State) =>
  {
    return state.user;
  }
};

export default getters;

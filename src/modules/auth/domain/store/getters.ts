import { PiniaGetters, State } from './types';

const getters: PiniaGetters = {
  GetToken: (state: State) =>
  {
    return state.bmToken;
  },
  GetUser: (state: State) =>
  {
    return state.bmUser;
  }
};

export default getters;

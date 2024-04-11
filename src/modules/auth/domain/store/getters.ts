import { PiniaGetters, State } from './types';

const getters: PiniaGetters = {
  GetToken: (state: State) =>
  {
    return state.prToken;
  }
};

export default getters;

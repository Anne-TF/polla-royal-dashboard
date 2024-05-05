import { State } from './types';

const state = (): State =>
{
  return {
    prToken: null,
    isSuperAdmin: true,
    user: null
  };
};

export default state;

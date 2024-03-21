import { AxiosError } from 'axios';

export const axiosCatchError = async(err: AxiosError, context: any, ...args: any) =>
{
  return Promise.reject(err);
};

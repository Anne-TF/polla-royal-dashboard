import { AxiosError } from 'axios';
import { onErrorPushToPage } from '@common/utils';
import configuration from '@config/configuration';
import { $globalRoute } from 'app/src/router';
import { useAuthStore } from '@modules/auth/domain/store';

export const axiosCatchError = async(err: AxiosError, context: any, ...args: any) =>
{
  const errorCode = err.response.data['errorCode'];

  if (Object.keys(configuration().onErrorPath).includes(errorCode))
  {
    const authStore = useAuthStore();

    authStore.$reset();
  }

  await onErrorPushToPage(errorCode, configuration().onErrorPath, $globalRoute);

  return Promise.reject(err);
};

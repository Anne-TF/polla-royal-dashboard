import { axiosCatchError, defaultCatchError, zodCatchError } from '@common/utils';
import { AxiosError } from 'axios';
import { Catch } from '@common/decorators/catch.decorator';
import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { ZodError } from 'zod';
import { useAuthStore } from '@modules/auth/domain/store';
import { BalanceGateway } from '@modules/auth/infrastructure/gateways';

export class GetBalancesUseCase
{

  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  @Catch(ZodError, zodCatchError)
  static async handle()
  {
    const authStore = useAuthStore();

    const result  = (await BalanceGateway.balances(authStore.GetToken)).data.data;

    authStore.setBalances(result.balances);

    return result;
  }
}

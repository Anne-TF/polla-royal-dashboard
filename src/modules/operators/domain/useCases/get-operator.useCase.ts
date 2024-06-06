import { axiosCatchError, defaultCatchError } from '@common/utils';
import { AxiosError } from 'axios';
import { Catch } from '@common/decorators/catch.decorator';
import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { useAuthStore } from '@modules/auth/domain/store';
import { OperatorsGateway } from '@modules/operators/infrastructure/gateways';

export class GetOperatorUseCase
{
  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  static async handle(id: string)
  {
    const authStore = useAuthStore();

    return await OperatorsGateway.get(id, authStore.GetToken);
  }
}

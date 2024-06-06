import { axiosCatchError, defaultCatchError } from '@common/utils';
import { AxiosError } from 'axios';
import { Catch } from '@common/decorators/catch.decorator';
import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { useAuthStore } from '@modules/auth/domain/store';
import { OperatorsGateway } from '@modules/operators/infrastructure/gateways';

export class DeleteOperatorUseCase
{
  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  static async handle(id: number)
  {
    const authStore = useAuthStore();

    return await OperatorsGateway.delete(id, authStore.GetToken);
  }
}

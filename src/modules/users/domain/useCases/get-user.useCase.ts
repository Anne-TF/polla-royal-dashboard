import { axiosCatchError, defaultCatchError, zodCatchError } from '@common/utils';
import { AxiosError } from 'axios';
import { Catch } from '@common/decorators/catch.decorator';
import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { useAuthStore } from '@modules/auth/domain/store';
import { UsersGateway } from '@modules/users/infrastructure/gateways';

export class GetUserUseCase
{
  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  static async handle(id: string)
  {
    const authStore = useAuthStore();

    return await UsersGateway.get(id, authStore.GetToken);
  }
}

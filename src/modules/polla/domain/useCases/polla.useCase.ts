import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { Catch } from '@common/decorators/catch.decorator';
import { AxiosError } from 'axios';
import { axiosCatchError, defaultCatchError } from '@common/utils';
import { PollaGateway } from '@modules/polla/infrastructure/gateways';
import { usePollaStore } from '@modules/polla/domain/store';
import { useAuthStore } from '@modules/auth/domain/store';

export class PollaUseCase
{
  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  static async handle()
  {
    const authStore = useAuthStore();


  }
}

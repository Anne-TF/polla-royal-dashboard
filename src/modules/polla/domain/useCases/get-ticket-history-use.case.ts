import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { Catch } from '@common/decorators/catch.decorator';
import { AxiosError } from 'axios';
import { axiosCatchError, defaultCatchError } from '@common/utils';
import { PollaGateway } from '@modules/polla/infrastructure/gateways';
import { useAuthStore } from '@modules/auth/domain/store';

export class GetTicketHistoryUseCase
{
  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  static async handle(hippodromeId: string)
  {
    const authStore = useAuthStore();
    return (await PollaGateway.getTicketHistory(hippodromeId, authStore.GetToken)).data.data;
  }
}

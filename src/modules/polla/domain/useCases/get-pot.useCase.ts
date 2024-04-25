import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { Catch } from '@common/decorators/catch.decorator';
import { AxiosError } from 'axios';
import { axiosCatchError, defaultCatchError } from '@common/utils';
import { PollaGateway } from '@modules/polla/infrastructure/gateways';
import { usePollaStore } from '@modules/polla/domain/store';
import { useAuthStore } from '@modules/auth/domain/store';

export class GetPotUseCase
{
  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  static async handle(hippodromeId: string)
  {
    const authStore = useAuthStore();

    const response  = (await PollaGateway.getPot(hippodromeId, authStore.GetToken)).data.data;

    const pollaStore = usePollaStore();

    pollaStore.setPot(response.pot);
    // pollaStore.setTicket(response.price);
  }
}

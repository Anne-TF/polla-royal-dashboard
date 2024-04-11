import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { Catch } from '@common/decorators/catch.decorator';
import { AxiosError } from 'axios';
import { axiosCatchError, defaultCatchError } from '@common/utils';
import { PollaGateway } from '@modules/polla/infrastructure/gateways/polla.gateway';
import { Hippodrome, Race } from '@modules/polla/domain/models';
import { useAuthStore } from '@modules/auth/domain/store';

export class GetRacesUseCase
{
  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  static async handle(hippodrome: Hippodrome)
  {
    const authStore = useAuthStore();

    const result  = (await PollaGateway.getRaces(hippodrome.id, authStore.GetToken)).data.data;

    return hippodrome.races.reduce<Race[]>((acc, raceId) =>
    {
      return [
        ...acc,
        new Race(result[raceId])
      ];
    }, []);
  }
}

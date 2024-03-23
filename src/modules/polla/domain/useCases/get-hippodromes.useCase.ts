import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { Catch } from '@common/decorators/catch.decorator';
import { AxiosError } from 'axios';
import { axiosCatchError, defaultCatchError } from '@common/utils';
import { PollaGateway } from '@modules/polla/infrastructure/gateways';
import { Hippodrome } from '@modules/polla/domain/models';
import { usePollaStore } from '@modules/polla/domain/store';

export class GetHippodromesUseCase
{
  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  static async handle()
  {

    const response  = (await PollaGateway.getHippodromes()).data.data;

    const hippodromes = response.map((d) => (new Hippodrome(d)));

    const pollaStore = usePollaStore();

    pollaStore.setHippodromes(hippodromes);

    return hippodromes;
  }
}

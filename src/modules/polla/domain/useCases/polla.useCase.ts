import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { Catch } from '@common/decorators/catch.decorator';
import { AxiosError } from 'axios';
import { axiosCatchError, defaultCatchError, validationAt } from '@common/utils';
import { usePollaStore } from '@modules/polla/domain/store';
import { useAuthStore } from '@modules/auth/domain/store';
import { IPollaSchema, IPollaSelectionSchema, PollaSchema } from '@modules/polla/presentation/schemas';
import { PollaGateway } from '@modules/polla/infrastructure/gateways';

export class PollaUseCase
{

  static validateAt(property: keyof Partial<IPollaSchema>)
  {
    return validationAt(PollaSchema)(property);
  }

  static async validate(data: IPollaSchema)
  {
    return await PollaSchema.parseAsync(data);
  }

  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  static async handle()
  {
    const authStore = useAuthStore();
    const pollaStore = usePollaStore();

    const selections = Object.keys(pollaStore.Bet.races).reduce((acc, key) =>
    {
      return [
        ...acc,
        {
          raceId: key,
          runnersId: pollaStore.Bet.races[key]
        }
      ];
    }, [] as IPollaSelectionSchema[]);

    const data: IPollaSchema = {
      hippodromeId: pollaStore.Bet.hippodromeId,
      selections
    };

    const _data = await this.validate(data) as IPollaSchema;

    return await PollaGateway.bet(_data, authStore.GetToken);
  }
}

import { axiosCatchError, defaultCatchError, zodCatchError } from '@common/utils';
import { AxiosError } from 'axios';
import { Catch } from '@common/decorators/catch.decorator';
import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { ZodError } from 'zod';
import { useAuthStore } from '@modules/auth/domain/store';
import { IListOptionsSchema, ListOptionsSchema } from '@common/schemas';
import { OperatorsGateway } from '@modules/operators/infrastructure/gateways';

export class ListUseCase
{
  static async validate(queryParams: IListOptionsSchema)
  {
    return await ListOptionsSchema.parseAsync(queryParams);
  }

  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  @Catch(ZodError, zodCatchError)
  static async handle(queryParams: IListOptionsSchema)
  {
    const authStore = useAuthStore();
    return await OperatorsGateway.list(queryParams, authStore.GetToken);
  }
}

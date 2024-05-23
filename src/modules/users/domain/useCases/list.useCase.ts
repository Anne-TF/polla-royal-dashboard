import { axiosCatchError, defaultCatchError, zodCatchError } from '@common/utils';
import { AxiosError } from 'axios';
import { Catch } from '@common/decorators/catch.decorator';
import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { ZodError } from 'zod';
import { IListOptionsSchema, ListOptionsSchema } from '@modules/users/presentation/schemas';
import { UsersGateway } from '@modules/users/infrastructure/gateways';
import { useAuthStore } from '@modules/auth/domain/store';

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
    const _queryParams = await this.validate(queryParams) as IListOptionsSchema;
    const authStore = useAuthStore();
    return await UsersGateway.list(_queryParams, authStore.GetToken);
  }
}

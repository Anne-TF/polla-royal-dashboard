import { axiosCatchError, defaultCatchError, zodCatchError } from '@common/utils';
import { AxiosError } from 'axios';
import { Catch } from '@common/decorators/catch.decorator';
import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { ZodError } from 'zod';
import { useAuthStore } from '@modules/auth/domain/store';
import { FormSchema, IFormSchema } from '@modules/users/presentation/schemas';
import { UsersGateway } from '@modules/users/infrastructure/gateways';

export class CreateUserUseCase
{

  static async validate(data: IFormSchema)
  {
    return await FormSchema.parseAsync(data);
  }

  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  @Catch(ZodError, zodCatchError)
  static async handle(data: IFormSchema)
  {
    const authStore = useAuthStore();

    const _data = await this.validate(data) as IFormSchema;

    return await UsersGateway.create(_data, authStore.GetToken);
  }
}

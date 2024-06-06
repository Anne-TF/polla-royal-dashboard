import { axiosCatchError, defaultCatchError, zodCatchError } from '@common/utils';
import { AxiosError } from 'axios';
import { Catch } from '@common/decorators/catch.decorator';
import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { ZodError } from 'zod';
import { useAuthStore } from '@modules/auth/domain/store';
import { FormSchema, IFormSchema } from '@modules/users/presentation/schemas';
import { OperatorsGateway } from '@modules/operators/infrastructure/gateways';

export class UpdateOperatorUseCase
{

  static async validate(data: Partial<IFormSchema>)
  {
    return await FormSchema.parseAsync(data);
  }

  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  @Catch(ZodError, zodCatchError)
  static async handle(id: string, data: Partial <IFormSchema>)
  {
    const authStore = useAuthStore();

    const _data = await this.validate(data) as IFormSchema;

    return await OperatorsGateway.update(id, _data, authStore.GetToken);
  }
}

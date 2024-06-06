import { axiosCatchError, defaultCatchError, zodCatchError } from '@common/utils';
import { AxiosError } from 'axios';
import { Catch } from '@common/decorators/catch.decorator';
import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { ZodError } from 'zod';
import { useAuthStore } from '@modules/auth/domain/store';
import { OperatorsGateway } from '@modules/operators/infrastructure/gateways';
import { FormSchema, IFormSchema } from '@modules/operators/presentation/schemas';

export class CreateOperatorUseCase
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

    return await OperatorsGateway.create(_data, authStore.GetToken);
  }
}

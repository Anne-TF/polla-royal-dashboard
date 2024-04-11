import { HTTP } from '@common/services';
import { AxiosRequestConfig } from 'axios';
import authRoutes from '@modules/auth/infrastructure/routes';
import configuration from '@config/configuration';
import { ILoginResponse } from '@modules/auth/infrastructure/interfaces/login-response.interface';
import { ILoginSchema } from '@modules/auth/presentation/schemas';
import { setBasePath } from '@common/utils';

export class AuthGateway
{
  private static routes = authRoutes;
  private static basePath =  configuration().server.basePath;

  static async logIn(data: ILoginSchema)
  {
    const config: AxiosRequestConfig = {
      ... setBasePath(this.routes.login, this.basePath),
      data
    };

    return HTTP.request<ILoginResponse>({ config });
  }
}

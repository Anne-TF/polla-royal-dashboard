import { ILoginSchema } from '@modules/auth/presentation/schemas';
import { HTTP } from '@common/services';
import { AxiosRequestConfig } from 'axios';
import authRoutes, { setBasePath } from '@modules/auth/infrastructure/routes';
import configuration from '@config/configuration';
import { ILoginResponse } from '@modules/auth/infrastructure/interfaces/login-response.interface';
import { tokenExpired } from '@common/utils';
import { PiniaStore } from '@modules/auth/domain/store/types';
import { refreshTokenAndRetry } from '@modules/auth/infrastructure/utils';

export class AuthGateway
{
  private static routes = authRoutes;
  private static basePath = configuration().server.basePath;

  static async logIn(data: ILoginSchema)
  {
    const config: AxiosRequestConfig = {
      ... authRoutes.login,
      baseURL: configuration().server.basePath,
      data
    };
    return HTTP.request<ILoginResponse>({ config });
  }

  static async basicLogIn(data: ILoginSchema)
  {
    const config: AxiosRequestConfig = {
      ... setBasePath(this.routes.basicLogin, this.basePath),
      data
    };
    return HTTP.request<ILoginResponse>({ config });
  }


  static async logOut(token: string, store: PiniaStore)
  {
    const options: AxiosRequestConfig = {
      ... setBasePath(this.routes.logout, this.basePath)
    };

    return HTTP.request<{ data: { message: string; messageCode: string; } }>({
      config: options,
      token,
      retries: 2,
      onCatchError: refreshTokenAndRetry(store),
      retryCondition: tokenExpired
    });
  }
}

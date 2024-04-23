import { HTTP } from '@common/services';
import { AxiosRequestConfig } from 'axios';
import authRoutes from '@modules/auth/infrastructure/routes';
import configuration from '@config/configuration';
import { IBalancesResponse } from '@modules/auth/infrastructure/interfaces';
import { setBasePath } from '@common/utils';

export class BalanceGateway
{
  private static routes = authRoutes;
  private static basePath =  configuration().server.basePath;

  static async balances(token: string)
  {
    const config: AxiosRequestConfig = {
      ... setBasePath(this.routes.balances, this.basePath)
    };

    return HTTP.request<IBalancesResponse>({ config, token });
  }
}

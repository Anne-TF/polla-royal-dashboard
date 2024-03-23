import { HTTP } from '@common/services';
import { AxiosRequestConfig } from 'axios';
import configuration from '@config/configuration';
import { pollaRoutes } from '@modules/polla/infrastructure/routes';
import { IGetHippodromesResponse, IGetRacesResponse } from '@modules/polla/infrastructure/interfaces';
import { setBasePath, setUriParams } from '@common/utils';

export class PollaGateway
{
  private static routes = pollaRoutes;
  private static basePath = configuration().server.basePath;

  static async getHippodromes()
  {
    const config: AxiosRequestConfig = {
      ... setBasePath(this.routes.hippodromes, this.basePath)
    };

    return HTTP.request<IGetHippodromesResponse>({ config });
  }

  static async getRaces(hippodromeId: string)
  {

    const config: AxiosRequestConfig = {
      ... setBasePath(setUriParams(this.routes.races, { id: hippodromeId }), this.basePath),
      params: {
        id: hippodromeId
      }
    };

    return HTTP.request<IGetRacesResponse>({ config });
  }
}

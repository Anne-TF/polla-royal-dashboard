import { HTTP } from '@common/services';
import { AxiosRequestConfig } from 'axios';
import configuration from '@config/configuration';
import { pollaRoutes } from '@modules/polla/infrastructure/routes';
import {
  IGetTicketHistoryResponse,
  IGetHippodromesResponse,
  IGetPotResponse,
  IGetRacesResponse
} from '@modules/polla/infrastructure/interfaces';
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
      ... setBasePath(setUriParams(this.routes.races, { id: hippodromeId }), this.basePath)
    };

    return HTTP.request<IGetRacesResponse>({ config });
  }

  static async getPot(hippodromeId: string)
  {
    const config: AxiosRequestConfig = {
      ... setBasePath(setUriParams(this.routes.pot, { id: hippodromeId }), this.basePath)
    };

    return HTTP.request<IGetPotResponse>({ config });
  }


  static async getTicketHistory(hippodromeId: string)
  {
    const config: AxiosRequestConfig = {
      ... setBasePath(setUriParams(this.routes.hippodromeHistory, { id: hippodromeId }), this.basePath)
    };

    return HTTP.request<IGetTicketHistoryResponse>({ config });
  }

}

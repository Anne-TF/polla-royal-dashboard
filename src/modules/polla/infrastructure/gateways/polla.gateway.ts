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
import { IPollaSchema } from '@modules/polla/presentation/schemas';

export class PollaGateway
{
  private static routes = pollaRoutes;
  private static basePath = configuration().server.basePath;

  static async getHippodromes(token: string)
  {
    const config: AxiosRequestConfig = {
      ... setBasePath(this.routes.hippodromes, this.basePath)
    };

    return HTTP.request<IGetHippodromesResponse>({ config, token });
  }

  static async getRaces(hippodromeId: string, token: string)
  {
    const config: AxiosRequestConfig = {
      ... setBasePath(setUriParams(this.routes.races, { id: hippodromeId }), this.basePath)
    };

    return HTTP.request<IGetRacesResponse>({ config, token });
  }

  static async getPot(hippodromeId: string, token: string)
  {
    const config: AxiosRequestConfig = {
      ... setBasePath(setUriParams(this.routes.pot, { id: hippodromeId }), this.basePath)
    };

    return HTTP.request<IGetPotResponse>({ config, token });
  }

  static async getTicketHistory(hippodromeId: string, token: string)
  {
    const config: AxiosRequestConfig = {
      ... setBasePath(setUriParams(this.routes.hippodromeHistory, { id: hippodromeId }), this.basePath)
    };

    return HTTP.request<IGetTicketHistoryResponse>({ config, token });
  }

  static async bet(data: IPollaSchema, token: string)
  {
    const config: AxiosRequestConfig = {
      ... setBasePath(this.routes.bet, this.basePath),
      data
    };

    return HTTP.request<IGetTicketHistoryResponse>({ config, token });
  }
}

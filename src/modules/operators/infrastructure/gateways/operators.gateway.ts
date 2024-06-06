import { HTTP } from '@common/services';
import { AxiosRequestConfig } from 'axios';
import configuration from '@config/configuration';
import { setBasePath } from '@common/utils';
import { IAPIResponse } from '@common/interfaces';
import operatorsRoutes from '@modules/operators/infrastructure/routes';
import { IListOperatorsResponse, IOperator } from '@modules/operators/infrastructure/interfaces';
import { IFormSchema } from '@modules/operators/presentation/schemas';
import { IListOptionsSchema } from '@common/schemas';

export class OperatorsGateway
{
  private static routes = operatorsRoutes;
  private static basePath =  configuration().server.basePath;

  static async list(queryParams: IListOptionsSchema, token: string)
  {
    const config: AxiosRequestConfig = {
      ... setBasePath(this.routes.list, this.basePath)
    };

    return HTTP.request<IListOperatorsResponse>({ config, queryParams, token });
  }

  static async create(data: IFormSchema, token: string)
  {
    const config: AxiosRequestConfig = {
      ... setBasePath(this.routes.create, this.basePath),
      data
    };

    return HTTP.request<IAPIResponse<IOperator>>({ config, token });
  }

  static async update(id: string, data: Partial<IFormSchema>, token: string)
  {
    const config: AxiosRequestConfig = {
      ... setBasePath({ ...this.routes.update, url: this.routes.update.url.replace(':id', id) }, this.basePath),
      data
    };

    return HTTP.request<IAPIResponse<IOperator>>({ config, token });
  }

  static async delete(id: number, token: string)
  {
    const config: AxiosRequestConfig = {
      ... setBasePath({ ...this.routes.delete, url: this.routes.delete.url.replace(':id', id.toString()) }, this.basePath)
    };

    return HTTP.request<IAPIResponse<IOperator>>({ config, token });
  }

  static async get(id: string, token: string)
  {
    const config: AxiosRequestConfig = {
      ... setBasePath({ ...this.routes.get, url: this.routes.get.url.replace(':id', id) }, this.basePath)
    };

    return HTTP.request<IAPIResponse<IOperator>>({ config, token });
  }
}

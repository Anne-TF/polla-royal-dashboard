import { HTTP } from '@common/services';
import { AxiosRequestConfig } from 'axios';
import configuration from '@config/configuration';
import { setBasePath } from '@common/utils';
import userRoutes from '@modules/users/infrastructure/routes';
import { IFormSchema, IListOptionsSchema } from '@modules/users/presentation/schemas';
import { IListUsersResponse } from '@modules/users/infrastructure/interfaces/list-users-response.interface';
import { IAPIResponse } from '@common/interfaces';
import { IUser } from '@modules/users/infrastructure/interfaces';

export class UsersGateway
{
  private static routes = userRoutes;
  private static basePath =  configuration().server.basePath;

  static async list(queryParams: IListOptionsSchema, token: string)
  {
    const config: AxiosRequestConfig = {
      ... setBasePath(this.routes.list, this.basePath)
    };

    return HTTP.request<IListUsersResponse>({ config, queryParams, token });
  }

  static async create(data: IFormSchema, token: string)
  {
    const config: AxiosRequestConfig = {
      ... setBasePath(this.routes.create, this.basePath),
      data
    };

    return HTTP.request<IAPIResponse<IUser>>({ config, token });
  }

  static async update(id: string, data: Partial<IFormSchema>, token: string)
  {
    const config: AxiosRequestConfig = {
      ... setBasePath({ ...this.routes.update, url: this.routes.update.url.replace(':id', id) }, this.basePath),
      data
    };

    return HTTP.request<IAPIResponse<IUser>>({ config, token });
  }

  static async delete(id: number, token: string)
  {
    const config: AxiosRequestConfig = {
      ... setBasePath({ ...this.routes.delete, url: this.routes.delete.url.replace(':id', id.toString()) }, this.basePath)
    };

    return HTTP.request<IAPIResponse<IUser>>({ config, token });
  }

  static async get(id: string, token: string)
  {
    const config: AxiosRequestConfig = {
      ... setBasePath({ ...this.routes.get, url: this.routes.get.url.replace(':id', id) }, this.basePath)
    };

    return HTTP.request<IAPIResponse<IUser>>({ config, token });
  }
}

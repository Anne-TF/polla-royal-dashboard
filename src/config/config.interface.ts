
export interface IAppConfig
{
  name: string;
  port: number;
}

export interface IServerConfig {
  host: string;
  port: number;
  basePath: string;
  useSSL: boolean;
  withCredentials: boolean;
}


export interface IConfig {
  environment: string;
  app: IAppConfig;
  server: IServerConfig;
}
